module content_right::co_creation_policy {
    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use sui::coin::{Self, Coin};
    use sui::event;
    use sui::sui::SUI;

    const EInvalidWeightsSum: u64 = 0;
    const ELengthMismatch: u64 = 1;
    const EInsufficientFunds: u64 = 2;
    const ENoParticipants: u64 = 3;
    const EInvalidStampShare: u64 = 4;

    /// Shared object that turns manual remix permission into programmable visa-stamped consent.
    public struct CoCreationPolicy has key {
        id: UID,
        passport_id: ID,
        participants: vector<address>,
        weights: vector<u8>,
        remaining_share: u8,
        escrow_balance: Balance<SUI>,
    }

    public struct PolicyCreated has copy, drop {
        policy_id: ID,
        passport_id: ID,
        participants: vector<address>,
        weights: vector<u8>,
        remaining_share: u8,
    }

    public struct VisaStamped has copy, drop {
        policy_id: ID,
        creator: address,
        weight: u8,
        remaining_share: u8,
    }

    public struct FundsDeposited has copy, drop {
        policy_id: ID,
        amount: u64,
        depositor: address,
    }

    public struct RoyaltiesDistributed has copy, drop {
        policy_id: ID,
        total_amount: u64,
        timestamp: u64,
    }

    public fun create_policy(
        passport_id: ID,
        participants: vector<address>,
        weights: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let len = vector::length(&participants);
        assert!(len > 0, ENoParticipants);
        assert!(len == vector::length(&weights), ELengthMismatch);

        let mut sum = 0u64;
        let mut i = 0;
        while (i < len) {
            sum = sum + (*vector::borrow(&weights, i) as u64);
            i = i + 1;
        };
        assert!(sum == 100, EInvalidWeightsSum);

        let policy = CoCreationPolicy {
            id: object::new(ctx),
            passport_id,
            participants,
            weights,
            remaining_share: 0,
            escrow_balance: balance::zero(),
        };

        let policy_id = object::id(&policy);
        event::emit(PolicyCreated {
            policy_id,
            passport_id,
            participants: policy.participants,
            weights: policy.weights,
            remaining_share: policy.remaining_share,
        });

        transfer::share_object(policy);
    }

    public fun create_and_fund_policy(
        passport_id: ID,
        participants: vector<address>,
        weights: vector<u8>,
        payment: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let len = vector::length(&participants);
        assert!(len > 0, ENoParticipants);
        assert!(len == vector::length(&weights), ELengthMismatch);

        let mut sum = 0u64;
        let mut i = 0;
        while (i < len) {
            sum = sum + (*vector::borrow(&weights, i) as u64);
            i = i + 1;
        };
        assert!(sum == 100, EInvalidWeightsSum);

        let mut policy = CoCreationPolicy {
            id: object::new(ctx),
            passport_id,
            participants,
            weights,
            remaining_share: 0,
            escrow_balance: balance::zero(),
        };

        let policy_id = object::id(&policy);
        event::emit(PolicyCreated {
            policy_id,
            passport_id,
            participants: policy.participants,
            weights: policy.weights,
            remaining_share: policy.remaining_share,
        });

        let amount = coin::value(&payment);
        let depositor = tx_context::sender(ctx);
        let balance = coin::into_balance(payment);
        balance::join(&mut policy.escrow_balance, balance);

        event::emit(FundsDeposited {
            policy_id,
            amount,
            depositor,
        });

        transfer::share_object(policy);
    }

    public fun create_stamp_book(
        passport_id: ID,
        origin_creator: address,
        origin_weight: u8,
        ctx: &mut TxContext,
    ) {
        assert!(origin_weight > 0 && origin_weight <= 100, EInvalidStampShare);

        let mut participants = vector::empty<address>();
        let mut weights = vector::empty<u8>();
        vector::push_back(&mut participants, origin_creator);
        vector::push_back(&mut weights, origin_weight);

        let policy = CoCreationPolicy {
            id: object::new(ctx),
            passport_id,
            participants,
            weights,
            remaining_share: 100 - origin_weight,
            escrow_balance: balance::zero(),
        };

        let policy_id = object::id(&policy);
        event::emit(PolicyCreated {
            policy_id,
            passport_id,
            participants: policy.participants,
            weights: policy.weights,
            remaining_share: policy.remaining_share,
        });
        event::emit(VisaStamped {
            policy_id,
            creator: origin_creator,
            weight: origin_weight,
            remaining_share: 100 - origin_weight,
        });

        transfer::share_object(policy);
    }

    public fun stamp_visa(policy: &mut CoCreationPolicy, creator: address, weight: u8) {
        assert!(weight > 0 && weight <= policy.remaining_share, EInvalidStampShare);
        vector::push_back(&mut policy.participants, creator);
        vector::push_back(&mut policy.weights, weight);
        policy.remaining_share = policy.remaining_share - weight;

        event::emit(VisaStamped {
            policy_id: object::id(policy),
            creator,
            weight,
            remaining_share: policy.remaining_share,
        });
    }

    public fun fund_co_creation(
        policy: &mut CoCreationPolicy,
        payment: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let amount = coin::value(&payment);
        let depositor = tx_context::sender(ctx);
        let balance = coin::into_balance(payment);
        balance::join(&mut policy.escrow_balance, balance);

        event::emit(FundsDeposited {
            policy_id: object::id(policy),
            amount,
            depositor,
        });
    }

    public fun distribute_royalties(
        policy: &mut CoCreationPolicy,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let total_amount = balance::value(&policy.escrow_balance);
        assert!(total_amount > 0, EInsufficientFunds);

        let len = vector::length(&policy.participants);
        let mut i = 0;
        while (i < len) {
            let participant = *vector::borrow(&policy.participants, i);
            let weight = *vector::borrow(&policy.weights, i) as u64;
            let share = if (i == len - 1) {
                if (policy.remaining_share == 0) {
                    balance::value(&policy.escrow_balance)
                } else {
                    (total_amount * weight) / 100
                }
            } else {
                (total_amount * weight) / 100
            };

            if (share > 0) {
                let share_balance = balance::split(&mut policy.escrow_balance, share);
                let share_coin = coin::from_balance(share_balance, ctx);
                transfer::public_transfer(share_coin, participant);
            };
            i = i + 1;
        };

        event::emit(RoyaltiesDistributed {
            policy_id: object::id(policy),
            total_amount,
            timestamp: clock::timestamp_ms(clock),
        });
    }
}
