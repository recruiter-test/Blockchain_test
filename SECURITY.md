# Security Policy

## Known Security Vulnerabilities

This document tracks known security vulnerabilities in Arkavo Node's dependency chain. Many of these vulnerabilities are inherited from upstream Substrate/Polkadot SDK dependencies and are being tracked for resolution.

### Current Known CVEs

#### RUSTSEC-2025-0009: ring 0.16.20
- **Severity**: Medium
- **Status**: Upstream dependency (Substrate)
- **Description**: AES panic with overflow checking enabled on Armv8
- **Impact**: Potential panic in cryptographic operations on ARM architecture
- **Mitigation**: This is a transitive dependency through Substrate's crypto stack. We are monitoring Polkadot SDK updates for a fix.
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2025-0009.html

#### RUSTSEC-2025-0118: wasmtime 35.0.0
- **Severity**: Medium to High
- **Status**: Upstream dependency (Substrate)
- **Description**: Unsound API for shared memory in Wasmtime
- **Impact**: Potential memory safety issues in WASM runtime execution
- **Mitigation**: This vulnerability affects the Wasmtime version used by Substrate's WASM executor. We are tracking Substrate's stable releases for updates to newer Wasmtime versions.
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2025-0118.html

### Known Build Issues

#### pallet-staking: Missing peek_disabled trait implementation
- **Severity**: Build Error (Not Runtime Security Issue)
- **Status**: Upstream Substrate bug in stable2509
- **Description**: The `MigrateDisabledValidators` trait implementation in `pallet-staking` has a conditionally compiled method `peek_disabled()` that is only available with the `try-runtime` feature enabled. This causes compilation failures when building without `try-runtime`.
- **Impact**: CI builds fail without the `try-runtime` feature
- **Workaround**: All CI workflows now build with `--features try-runtime` to ensure the trait implementation is complete
- **Note**: This does not affect runtime security as we do not use `pallet-staking` directly; it's only a transitive dependency
- **Tracking**: Substrate stable2509 branch commit fd902fcc

### Dependency Management Strategy

Arkavo Node inherits ~500+ transitive dependencies from the Substrate/Polkadot SDK. Our security strategy includes:

1. **Commit-Locked Dependencies**: All Substrate dependencies are pinned to specific commits from the `stable2509` branch
2. **Daily Automated Audits**: Security audits run daily via GitHub Actions to detect new vulnerabilities
3. **Strict Source Policy**: Only crates.io and github.com/paritytech/polkadot-sdk.git are allowed as dependency sources
4. **Continuous Monitoring**: We actively monitor:
   - Polkadot SDK security advisories
   - RustSec advisory database
   - Substrate GitHub security updates

### Reporting Security Issues

If you discover a security vulnerability in Arkavo Node (excluding known upstream issues documented above), please report it by:

1. **DO NOT** open a public GitHub issue
2. Email security reports to: [security contact to be added]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Security Update Process

When new security vulnerabilities are discovered:

1. **Critical/High Severity**: Immediate evaluation and patching within 48 hours
2. **Medium Severity**: Evaluation within 1 week, patching in next release cycle
3. **Low Severity**: Tracked and addressed in regular dependency updates
4. **Upstream Issues**: Monitored via Substrate update tracking, applied when available

### Build-Time Security Enforcement

Our CI/CD pipeline enforces:

- **cargo-audit**: Blocks builds with known CVEs (except documented exceptions)
- **cargo-deny**: Enforces license and source policies
- **Clippy Security Lints**: Warns on unsafe patterns (unwrap, expect, panic, etc.)
- **Unsafe Code Detection**: Tracks all unsafe blocks for review

See [CLAUDE.md](CLAUDE.md) for detailed security tooling documentation.

### Version Support

- **Main Branch**: Receives all security updates immediately
- **Release Tags**: Critical security patches backported on case-by-case basis
- **EOL Policy**: Releases older than 3 months are not actively maintained

---

**Last Updated**: 2025-11-23
**Next Review**: 2025-12-23
