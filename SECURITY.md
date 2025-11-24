# Security Policy

## Known Security Vulnerabilities

This document tracks known security vulnerabilities in Arkavo Node's dependency chain. Many of these vulnerabilities are inherited from upstream Substrate/Polkadot SDK and Ink! dependencies and are being tracked for resolution.

**Last Audit**: 2025-11-23
**Total Dependencies**: 881 crates
**Vulnerabilities**: 2 advisories, 5 unmaintained, 1 yanked

### Vulnerability Tracking Approach

We take a **transparent, non-blocking** approach to dependency security:

1. **No Ignored Advisories**: We do NOT ignore vulnerabilities in `deny.toml` - this ensures new issues are always detected
2. **CI Informational Mode**: Security checks run on every PR but use `continue-on-error: true` to avoid blocking development on upstream issues
3. **Documented Exceptions**: All known issues are documented here with impact analysis
4. **GitHub Issues**: Critical vulnerabilities tracked via GitHub issues with labels: `security`, `dependencies`
5. **Daily Monitoring**: Automated daily audits alert us to new vulnerabilities immediately

**Why not block PRs on security failures?**
- Most issues are in upstream dependencies (Substrate/Ink!) beyond our control
- Blocking would prevent legitimate development while waiting for upstream fixes
- Transparency + documentation > false sense of security from ignored advisories

### Current Known CVEs

#### RUSTSEC-2025-0055: tracing-subscriber 0.2.25 ⚠️ ERROR
- **Severity**: Medium
- **Status**: Upstream dependency (Ink! contracts)
- **Description**: Logging user input may result in poisoning logs with ANSI escape sequences
- **Impact**: Log injection attacks if user-controlled input is logged without sanitization
- **Dependency Path**: `ink_sandbox` → `ark-r1cs-std` → `ark-relations` → `tracing-subscriber 0.2.25`
- **Mitigation**: Dev dependency through `ink_sandbox` used only in contract testing. Not used in production runtime.
- **Solution**: Upgrade to `tracing-subscriber >=0.3.20`
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2025-0055.html

#### RUSTSEC-2025-0010: ring 0.16.20 ⚠️ UNMAINTAINED
- **Severity**: Medium (Maintenance)
- **Status**: Upstream dependency (Substrate cryptography)
- **Description**: ring 0.16.20 is over 4 years old and no longer maintained. Only ring 0.17+ receives security updates.
- **Impact**: Missing security patches and bug fixes for cryptographic library
- **Dependency Path**: Substrate → `sp-core` → `ring 0.16.20`
- **Mitigation**: Awaiting Substrate migration to ring 0.17+. Tracking Polkadot SDK updates.
- **Solution**: Upgrade to `ring >=0.17.10`
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2025-0010.html, https://github.com/briansmith/ring/discussions/2450

### Unmaintained Dependencies (Warnings)

The following dependencies are flagged as unmaintained but pose lower security risk:

#### RUSTSEC-2024-0388: derivative 2.2.0
- **Status**: Unmaintained (since 2024-06-26)
- **Impact**: Derive macro for custom trait implementations
- **Dependency Path**: Substrate cryptographic libraries (`ark-*` ecosystem)
- **Mitigation**: Upstream dependency. Monitoring Substrate updates for migration.
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2024-0388.html

#### RUSTSEC-2022-0061: parity-wasm 0.45.0
- **Status**: Deprecated by author (2022-10-01)
- **Impact**: WASM parsing library used in `sp-version`
- **Mitigation**: Substrate will migrate to maintained alternatives (`wasm-*` family)
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2022-0061.html

#### RUSTSEC-2024-0436: paste 1.0.15
- **Status**: Unmaintained (since 2024-10-07)
- **Impact**: Compile-time macro for token concatenation
- **Risk**: Low (compile-time only, no runtime impact)
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2024-0436.html

#### RUSTSEC-2024-0370: proc-macro-error 1.0.4
- **Status**: Unmaintained (since 2024-09-01)
- **Impact**: Error handling for procedural macros
- **Risk**: Low (compile-time only via `frame-support`)
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2024-0370.html

#### RUSTSEC-2020-0163: term_size 0.3.2
- **Status**: Unmaintained (replaced by `terminal_size`)
- **Impact**: Terminal size detection in dev tooling
- **Dependency**: Dev-only via `contract-build` (Ink! tooling)
- **Solution**: Migrate to `terminal_size` crate
- **Tracking**: https://rustsec.org/advisories/RUSTSEC-2020-0163.html

### Yanked Crates

#### const-hex 1.13.0 (YANKED)
- **Status**: Yanked from crates.io
- **Dependency Path**: `frame-metadata-hash-extension` → `const-hex 1.13.0`
- **Impact**: Yanked crates are typically removed for breaking changes or critical bugs
- **Mitigation**: Substrate dependency via `frame-metadata-hash-extension`. Awaiting upstream update.
- **Risk**: Low (likely yanked for non-security reasons, still functional)
- **Note**: Version is locked in Cargo.lock, will not auto-update until Substrate updates

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
