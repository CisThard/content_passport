module content_right::genesis_passport {
    use sui::event;

    const EInvalidGrade: u64 = 0;
    const EEmptyHash: u64 = 1;

    public struct GenesisPassport has key, store {
        id: UID,
        content_hash: vector<u8>,
        grade: vector<u8>,
        media_blob_id: vector<u8>,
        evidence_blob_id: vector<u8>,
        owner: address,
    }

    public struct PassportIssued has copy, drop {
        passport_id: ID,
        owner: address,
        grade: vector<u8>,
        media_blob_id: vector<u8>,
        evidence_blob_id: vector<u8>,
    }

    public fun issue_passport(
        content_hash: vector<u8>,
        grade: vector<u8>,
        media_blob_id: vector<u8>,
        evidence_blob_id: vector<u8>,
        ctx: &mut TxContext,
    ): GenesisPassport {
        assert!(vector::length(&content_hash) > 0, EEmptyHash);
        assert!(is_accepted_grade(&grade), EInvalidGrade);

        let owner = tx_context::sender(ctx);
        let passport = GenesisPassport {
            id: object::new(ctx),
            content_hash,
            grade,
            media_blob_id,
            evidence_blob_id,
            owner,
        };
        let passport_id = object::id(&passport);

        event::emit(PassportIssued {
            passport_id,
            owner,
            grade: passport.grade,
            media_blob_id: passport.media_blob_id,
            evidence_blob_id: passport.evidence_blob_id,
        });

        passport
    }

    fun is_accepted_grade(grade: &vector<u8>): bool {
        let aaa = b"AAA";
        let aa = b"AA";
        let a = b"A";
        grade == &aaa || grade == &aa || grade == &a
    }
}
