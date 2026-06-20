module content_right::seal_policy {
    use sui::clock::{Self, Clock};
    use sui::event;

    const EInvalidThreshold: u64 = 0;
    const ENoKeyNodes: u64 = 1;
    const ENotAuthorized: u64 = 2;

    public struct SealPolicy has key {
        id: UID,
        evidence_blob_id: vector<u8>,
        authorized_creators: vector<address>,
        threshold: u8,
        key_nodes: vector<address>,
        approvals: vector<SealApproval>,
    }

    public struct SealApproval has store {
        requester: address,
        session_public_key: vector<u8>,
        expires_at_ms: u64,
    }

    public struct SealPolicyCreated has copy, drop {
        policy_id: ID,
        evidence_blob_id: vector<u8>,
        threshold: u8,
    }

    public struct SealApproved has copy, drop {
        policy_id: ID,
        requester: address,
        session_public_key: vector<u8>,
        ttl_ms: u64,
        expires_at_ms: u64,
    }

    public fun create_policy(
        evidence_blob_id: vector<u8>,
        authorized_creators: vector<address>,
        threshold: u8,
        key_nodes: vector<address>,
        ctx: &mut TxContext,
    ) {
        let key_node_count = vector::length(&key_nodes);
        assert!(key_node_count > 0, ENoKeyNodes);
        assert!(threshold > 0 && (threshold as u64) <= key_node_count, EInvalidThreshold);

        let policy = SealPolicy {
            id: object::new(ctx),
            evidence_blob_id,
            authorized_creators,
            threshold,
            key_nodes,
            approvals: vector::empty<SealApproval>(),
        };
        let policy_id = object::id(&policy);

        event::emit(SealPolicyCreated {
            policy_id,
            evidence_blob_id: policy.evidence_blob_id,
            threshold,
        });

        transfer::share_object(policy);
    }

    public fun seal_approve(
        policy: &mut SealPolicy,
        clock: &Clock,
        session_public_key: vector<u8>,
        ttl_ms: u64,
        ctx: &mut TxContext,
    ) {
        let requester = tx_context::sender(ctx);
        assert!(contains_address(&policy.authorized_creators, requester), ENotAuthorized);
        assert!(ttl_ms > 0, EInvalidThreshold);
        let expires_at_ms = clock::timestamp_ms(clock) + ttl_ms;
        let event_session_public_key = copy_bytes(&session_public_key);

        vector::push_back(&mut policy.approvals, SealApproval {
            requester,
            session_public_key,
            expires_at_ms,
        });

        event::emit(SealApproved {
            policy_id: object::id(policy),
            requester,
            session_public_key: event_session_public_key,
            ttl_ms,
            expires_at_ms,
        });
    }

    fun copy_bytes(bytes: &vector<u8>): vector<u8> {
        let mut out = vector::empty<u8>();
        let len = vector::length(bytes);
        let mut i = 0;
        while (i < len) {
            vector::push_back(&mut out, *vector::borrow(bytes, i));
            i = i + 1;
        };
        out
    }

    fun contains_address(values: &vector<address>, target: address): bool {
        let len = vector::length(values);
        let mut i = 0;
        while (i < len) {
            if (*vector::borrow(values, i) == target) {
                return true
            };
            i = i + 1;
        };
        false
    }
}
