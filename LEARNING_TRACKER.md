# Full-Stack Mastery Learning Tracker

> **Purpose:** source of truth for progress, mastery, quizzes, mistakes, technical debt, and next actions.
>
> **Learning rule:** a topic is not complete because it was explained. It is complete when I can **Explain → Implement → Debug → Apply → Defend** it.

---

## Progress Legend

| Status | Meaning |
|---|---|
| `TODO` | Not started |
| `IN PROGRESS` | Currently learning |
| `REVIEW` | Learned, but needs reinforcement |
| `BLOCKED` | Dependency or unresolved issue |
| `DONE` | Demonstrated understanding + implementation |

### Mastery

```text
[ ] Explain
[ ] Implement
[ ] Debug
[ ] Apply
[ ] Defend
```

---

# Current Position

**Track:** 4 — Backend Build  
**Phase:** O — Node.js & Express v5 Core — ✅ **COMPLETE + checkpoint PASSED (2026-09-02)**  
**Current topic:** → **Phase P on-ramp: convert the whole codebase JS → TypeScript**, then P.1 advanced Sequelize queries + Repository pattern  (next session)  
**Revise (spaced):** `isOperational` hides non-operational error messages · per-instance state vs horizontal scaling (Redis/S3/log-aggregation)  
**Overall strategy:** project-first, implementation-heavy, active recall

### Already demonstrated

- [x] Express routing & middleware
- [x] Zod validation
- [x] MySQL fundamentals
- [x] Sequelize models & associations
- [x] Migrations & seeders
- [x] Registration & login flow
- [x] Auth strategy middleware

### Current project

```text
├── ./.env
├── ./package-lock.json
├── ./package.json
└── ./src
    ├── ./src/config
    │   └── ./src/config/db.js
    ├── ./src/controller
    │   ├── ./src/controller/authController.js
    │   ├── ./src/controller/userController.js
    │   └── ./src/controller/watchlistController.js
    ├── ./src/middelware
    │   └── ./src/middelware/authMiddelWare.js
    ├── ./src/models
    │   ├── ./src/models/index.js
    │   ├── ./src/models/movie.js
    │   ├── ./src/models/user.js
    │   └── ./src/models/watchlist.js
    ├── ./src/routes
    │   ├── ./src/routes/authRoute.js
    │   ├── ./src/routes/movies.js
    │   └── ./src/routes/watchlistRoute.js
    ├── ./src/seed.js
    ├── ./src/server.js
    └── ./src/utils
        └── ./src/utils/generateToken.js
```

> Note: `middelware` / `authMiddelWare.js` naming should be reviewed as technical debt, but should not be changed automatically.

---

# Track 4 — Backend Build

## Phase O — Node.js & Express v5 Core

### 1. Node.js internals — event loop & streams
**Status:** `REVIEW`  (core demonstrated 2026-09-02)

Tasks:

- [x] Explain Node.js process model
- [ ] Explain V8 at a useful practical level
- [x] Explain libuv
- [x] Explain event loop
- [ ] Explain event loop phases (named phases + setImmediate vs setTimeout — TODO)
- [x] Explain microtasks vs macrotasks
- [x] Explain `process.nextTick`
- [x] Explain timers
- [x] Explain I/O callbacks
- [x] Explain why CPU-heavy work blocks Node
- [x] Explain `fs`
- [x] Explain `Buffer`
- [x] Explain streams
- [x] Implement readable stream example
- [x] Implement writable stream example (Transform stream — TODO)
- [x] Explain backpressure (built drain protocol; observed 370MB→69MB RSS)
- [x] Debug an event-loop ordering exercise

Remaining before DONE: V8 practical model · named event-loop phases · a Transform stream · apply streams in the movie/watchlist project · Defend (interview Qs)

Mastery:

```text
[x] Explain
[x] Implement
[x] Debug
[ ] Apply     (labs only — not yet used in the project)
[ ] Defend    (not yet tested with interview questions)
```

---

### 2. Error handling — global & typed
**Status:** `IN PROGRESS`  (core built + verified 2026-09-02)

- [x] Create `AppError` (extends Error; statusCode + isOperational)
- [x] Understand HTTP error categories (400 vs 401 vs 404 vs 409 vs 500)
- [x] Build global error middleware (4-arg, mounted last)
- [ ] Build `asyncHandler` (optional on Express 5 — auto-forwards; still learn it for Express 4 code)
- [x] Handle operational vs programmer errors (isOperational; log non-operational only)
- [ ] Prevent leaked stack traces in production (message hidden; NODE_ENV-based stack split still TODO)
- [x] Standardize API error response (`{ statusCode, message }`)
- [x] Test failure paths (isolated harness verified 409/404/500; secret stayed server-side)

Applied to: watchlistController ✓ · authController ✓ (register→409; login enumeration leak closed) · Express 5 auto-forward learned
Security learned: user enumeration (equal responses) + timing attack (equal timing via dummy-hash — deferred to Phase Q)

Mastery:

```text
[x] Explain
[x] Implement
[x] Debug
[x] Apply     (watchlist + auth refactored & verified)
[ ] Defend    (at Phase O checkpoint)
```

---

### 3. Swagger / OpenAPI
**Status:** `REVIEW`  (core done + verified 2026-09-02)

- [x] Understand OpenAPI (contract; paths / components / securitySchemes; codegen payoff → Phase T)
- [x] Define schemas (RegisterRequest, LoginRequest, AuthResponse, Error via `$ref`)
- [x] Generate Swagger/OpenAPI docs (hand-authored YAML `src/swagger.yaml`, OpenAPI 3.0.3)
- [x] Add route documentation (/auth/register, /auth/login — summaries + Auth tag)
- [x] Add authentication documentation (bearerAuth scheme; Authorize button renders)
- [x] Add request/response schemas (requestBody + 201/409/200/401)
- [x] Integrate Swagger UI (swagger-ui-express at /api-docs, mounted before auth guard = public)
- [ ] Connect validation schema and API contract (Zod-to-OpenAPI — future)

Checkpoint:
- [x] Document auth API (register + login — rendered in Swagger UI, verified)
- [ ] Document movie API (poster upload — replicate pattern)
- [ ] Document watchlist API (TODO)

Verified: /api-docs renders (Movie App API, OAS 3.0), Auth tag both endpoints, Authorize button present.
Debug lesson: malformed YAML fails-fast at load ("Map keys must be unique at line 84" — copy-paste dup).
Nit: `server.js` still has a redundant `import "dotenv/config"` (env.js owns env loading)
Mastery: [x] Explain [x] Implement [x] Debug [x] Apply [ ] Defend

---

### 4. Logging + security middleware
**Status:** `IN PROGRESS`  (logging half done + verified 2026-09-02)

- [x] Pino (structured JSON; pretty in dev via pino-pretty, raw JSON in prod)
- [x] Structured logs (fields vs string interpolation; `err` serializer)
- [x] Log levels (env `LOG_LEVEL`; filtering verified)
- [x] Request correlation/request IDs (pino-http; `reqId` shared across a request's logs)
- [x] Helmet (secure headers; removes X-Powered-By)
- [ ] CORS (⚠️ was mounted wide-open `*` — wrong call signature; fix = single options object)
- [x] Rate limiting (authLimiter 5/15min on /auth; 429 verified — brute-force shield)
- [x] Compression (gzip responses)
- [x] Avoid logging secrets/tokens (pino `redact` — verified Authorization/cookie → `[REDACTED]`)

Debug lesson: `pino({transport})` — transport is a KEY inside options, not the options object (silent raw-JSON bug).
Remaining: security middleware (Helmet, CORS, rate-limit, compression) · fix `pino-http` mount order · restore/migrate `.sync()` (→ Phase P migrations)

---

### 5. File uploads
**Status:** `REVIEW`  (core done + verified 2026-09-02)

- [x] Understand multipart/form-data (boundary-separated parts; why express.json can't parse it)
- [x] Multer (memoryStorage vs diskStorage; req.file / req.files)
- [x] File validation (fileFilter allow-list: jpeg/png/webp)
- [x] Size limits (2MB fileSize limit)
- [x] MIME/type handling (client mimetype gate; magic-byte verification deferred — spoofable)
- [ ] Object storage (concept learned — S3; not implemented, no cloud yet)
- [ ] Presigned upload URLs (concept learned — client uploads direct to S3; impl → capstone)
- [ ] Secure download strategy (not yet)
- [ ] Failure cleanup (not yet — delete orphaned files on error)

Implemented: `POST /movies/:id/poster` → diskStorage, UUID filename (not originalname), `posterUrl` = generated key; files verified in `uploads/` (gitignored)
Remaining before DONE: Multer `LIMIT_FILE_SIZE` → 413 · magic-byte MIME check · secure download · orphan cleanup · Defend
Mastery: [x] Explain [x] Implement [x] Debug [x] Apply [ ] Defend

---

### 6. Transactional email
**Status:** `REVIEW`  (core done + verified 2026-09-02)

- [x] Email provider SDK (Nodemailer + Ethereal test transport; verified preview URL)
- [x] Email template (welcome HTML with name)
- [x] Configuration (transporter setup; Ethereal creds runtime-generated; real provider → Topic 7)
- [x] Sandbox vs production (Ethereal now; swap transport for real provider in prod — same API)
- [ ] Bounce handling (provider-specific — deferred)
- [ ] Retry strategy (comes with the queue — Phase R)
- [ ] Move sending to async queue later (seam built: non-fatal send after response → BullMQ in Phase R)

Implemented: `services/email.js` `sendWelcomeEmail` — self-contained try/catch (never throws to caller); called in `register` after the response. Verified: real Ethereal send → preview URL logged.
Notes/debt: top-level `await createTestAccount()` couples startup to network (→ lazy/config in Topic 7); prefer `logger.error({err}, …)`; escape user input in email HTML
Mastery: [x] Explain [x] Implement [x] Debug [x] Apply [ ] Defend

---

### 7. Environment configuration & secrets
**Status:** `REVIEW`  (core done + verified 2026-09-02)

- [x] Validate environment variables (Zod schema in `src/config/env.js`, `safeParse`)
- [x] Create typed config layer (`export const env`; every module reads `env.*`, not `process.env`)
- [x] Fail fast on invalid config (verified: missing JWT_SECRET → clear error + exit 1)
- [x] Separate development/test/production config (`NODE_ENV` enum)
- [x] Secret storage concepts (env → secrets manager in prod; access control + rotation)
- [x] Never commit secrets (.gitignore + untracked; ⚠️ still in HISTORY → rotate JWT_SECRET)
- [x] Rotate credentials conceptually (config-not-constants; key-id for graceful JWT rotation)

Implemented: `config/env.js` loads dotenv first + Zod-validates; migrated ALL reads (generateToken, authMiddelWare, logger, db.js) to `env.*`; `db.js` uses `env.DB_URL` (hardcoded creds gone). Verified: fail-fast (exit 1) + `LOG_LEVEL=warn` now applied (dotenv ordering bug dead) + circular-dep bug fixed (env.js depends on nothing app-level).
Debug lesson: config module must be the ROOT of the import graph — importing the logger into it caused a circular dep (`Cannot access 'env' before initialization`); use `console.error`.
Nits: `z.prettifyError()` for output; `.min(1)` on JWT_SECRET/DB_URL
Mastery: [x] Explain [x] Implement [x] Debug [x] Apply [ ] Defend

---

### 8. Phase O checkpoint
**Status:** `DONE` (2026-09-02) — PASS, 2 flagged revision items

- [x] Concepts (8 Q): 72% → remediated pass (config + uploads cleared; **`isOperational` message-hiding = revise**)
- [x] Debugging (2): PASS — middleware order ✓; missing-`return` double-send (found fix; sharpen naming the mechanism)
- [x] Implementation: `GET /movies/:id` + OpenAPI — code correct; YAML Movie-schema indent bug (3rd YAML whitespace slip)
- [ ] Architecture: **WEAK ~30%** — per-instance state vs horizontal scaling: in-mem rate limiter → Redis, local disk → S3, JWT = stateless (OK), logs → aggregation → **Phase R + System Design**
- [x] Interview (3): strong — bcrypt (salt+cost) ✓, JWT stateless ✓, event loop (brief)

**Verdict: PASS.** Revision items → (1) `isOperational` hides non-operational messages; (2) per-instance state is the enemy of horizontal scaling.

---

# Phase P — MySQL & Sequelize v6

## 0. JS → TypeScript migration (on-ramp — requested 2026-09-02)
**Status:** `TODO` — do this FIRST in Phase P (convert the whole existing codebase to TS)

Why now: Phase P's service/repository layers are TS-first; converting the existing Express + Sequelize code gives end-to-end type safety (controllers, models, config, error shapes) and makes the repository pattern natural.

Plan (incremental — keep the app running the whole time):
- [ ] Install: `typescript`, `tsx`, `@types/node`, `@types/express`, `@types/jsonwebtoken`, `@types/multer`, `@types/cors`, `@types/compression`
- [ ] `tsconfig.json` — ESM (`module`/`moduleResolution: NodeNext`), `strict: true`, `outDir`/`rootDir`, `allowJs` for incremental migration
- [ ] Scripts: `dev` → `tsx watch src/server.ts`; `build` → `tsc`; `start` → `node dist/server.js`
- [ ] Migrate leaf-first: utils → config → models → middleware → controllers → routes → server (rename `.js` → `.ts`, one at a time)
- [ ] Type Sequelize models (`InferAttributes` / `InferCreationAttributes`) — the biggest lift
- [ ] Type Express (`Request`/`Response`/`NextFunction`); augment `Request` with `user` via declaration merging (for `authMiddelWare`)
- [ ] Config typed for free: `type Env = z.infer<typeof envSchema>`
- [ ] Type `AppError`, the pino logger, `req.file` (multer)
- [ ] Verify: `tsc` passes under `strict`, app boots, `/api-docs` still serves

Watch-outs: under NodeNext, keep `.js` extensions in imports even in `.ts` source; Sequelize typing is the fiddly part; also fix the `middelware/` folder typo during the move.

## 1. Advanced Sequelize queries
**Status:** `TODO`

- [ ] Raw queries
- [ ] Scopes
- [ ] Hooks
- [ ] Bulk create/update
- [ ] Bulk destroy considerations
- [ ] Transactions
- [ ] Isolation concepts
- [ ] Optimistic locking
- [ ] N+1 detection
- [ ] EXPLAIN

Mastery:

```text
[ ] Explain
[ ] Implement
[ ] Debug
[ ] Apply
[ ] Defend
```

---

## 2. Repository pattern with TypeScript
**Status:** `TODO`

Target architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Sequelize
    ↓
MySQL
```

- [ ] Convert relevant code to TypeScript
- [ ] Design repository interface
- [ ] Implement repository
- [ ] Add service layer
- [ ] Introduce DTOs
- [ ] Separate transport from business logic
- [ ] Test service independently

---

## 3. Pagination & filtering
**Status:** `TODO`

- [ ] Offset pagination
- [ ] Cursor pagination
- [ ] Choosing cursor vs offset
- [ ] Stable sorting
- [ ] Dynamic filters
- [ ] Search
- [ ] Validation of pagination parameters
- [ ] Performance implications
- [ ] API response metadata

---

## 4. Phase P checkpoint
**Status:** `TODO`

- [ ] DB design exercise
- [ ] ERD
- [ ] migrations
- [ ] repository layer
- [ ] services
- [ ] pagination
- [ ] filtering
- [ ] transaction
- [ ] optimistic locking scenario
- [ ] checkpoint interview

---

# Phase Q — JWT Authentication

## 1. JWT deep dive
**Status:** `TODO`

- [ ] JWT anatomy
- [ ] header
- [ ] payload
- [ ] signature
- [ ] HS256
- [ ] RS256
- [ ] public/private keys
- [ ] trade-offs
- [ ] access token
- [ ] refresh token
- [ ] expiration
- [ ] token misuse scenarios

---

## 2. Refresh token rotation
**Status:** `TODO`

- [ ] Refresh token DB model
- [ ] Hash refresh tokens where appropriate
- [ ] Rotation
- [ ] Reuse detection
- [ ] Revocation
- [ ] Device sessions
- [ ] Logout current device
- [ ] Logout all devices
- [ ] Token expiry
- [ ] Session cleanup

---

## 3. Secure auth checkpoint
**Status:** `TODO`

- [ ] Register
- [ ] Login
- [ ] Access token
- [ ] Refresh token
- [ ] Rotation
- [ ] Revocation
- [ ] Logout
- [ ] Protected routes
- [ ] Role/permission guard
- [ ] Security quiz
- [ ] Explain session model

---

# Phase R — Redis & BullMQ

## Redis
**Status:** `TODO`

- [ ] Strings
- [ ] Hashes
- [ ] Lists
- [ ] Sets
- [ ] Sorted sets
- [ ] TTL
- [ ] Expiration
- [ ] Pub/sub
- [ ] Persistence
- [ ] Pipelines

## Caching
**Status:** `TODO`

- [ ] Cache-aside
- [ ] Write-through
- [ ] Invalidation
- [ ] Serialization
- [ ] Cache stampede concept
- [ ] TTL choice
- [ ] Cache key design

## BullMQ
**Status:** `TODO`

- [ ] Queue
- [ ] Job
- [ ] Worker
- [ ] Delayed jobs
- [ ] Priority
- [ ] Retries
- [ ] Exponential backoff
- [ ] Concurrency
- [ ] Rate limiting
- [ ] Flows
- [ ] Dead-letter handling
- [ ] Idempotent jobs

## Monitoring
**Status:** `TODO`

- [ ] Queue dashboard
- [ ] Secure dashboard
- [ ] Failed jobs
- [ ] Retry visibility
- [ ] Queue metrics

## Session / scaling
**Status:** `TODO`

- [ ] Redis session store
- [ ] Socket.IO Redis adapter
- [ ] Horizontal scaling
- [ ] Cross-instance communication

## Phase R checkpoint
**Status:** `TODO`

Build:

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Email provider
```

- [ ] Job creation
- [ ] persistence
- [ ] retry
- [ ] backoff
- [ ] failure handling
- [ ] monitoring

---

# Phase S — Socket.IO

**Status:** `TODO`

- [ ] Socket server setup
- [ ] Connection lifecycle
- [ ] Events
- [ ] Emit/on
- [ ] Acknowledgements
- [ ] Rooms
- [ ] Namespaces
- [ ] Handshake middleware
- [ ] JWT authentication
- [ ] User ↔ socket mapping
- [ ] Disconnect handling
- [ ] Redis adapter
- [ ] Multi-server broadcasting
- [ ] Sticky session trade-offs
- [ ] Notification architecture
- [ ] SSE vs WebSocket

## Checkpoint

- [ ] Authenticated room-based chat
- [ ] Typing indicator
- [ ] Presence/disconnect handling
- [ ] Redis scaling
- [ ] Explain architecture

---

# Phase T — Angular + OpenAPI

## Angular foundations
**Status:** `TODO`

- [ ] Components
- [ ] Standalone architecture
- [ ] Templates
- [ ] Data binding
- [ ] Lifecycle
- [ ] Dependency injection
- [ ] Services
- [ ] Providers

## RxJS
**Status:** `TODO`

- [ ] Observable
- [ ] Subject
- [ ] BehaviorSubject
- [ ] map
- [ ] filter
- [ ] switchMap
- [ ] mergeMap
- [ ] combineLatest
- [ ] unsubscribe / lifecycle concerns

## Routing
**Status:** `TODO`

- [ ] Router
- [ ] Lazy loading
- [ ] Guards
- [ ] CanActivate / CanMatch
- [ ] Params
- [ ] Resolvers

## Forms
**Status:** `TODO`

- [ ] FormBuilder
- [ ] FormGroup
- [ ] Validators
- [ ] Async validators
- [ ] Signal Forms concepts

## OpenAPI codegen
**Status:** `TODO`

- [ ] Generate client from backend OpenAPI
- [ ] Generate models
- [ ] Generated services
- [ ] Base URL configuration
- [ ] Regeneration workflow

## HttpClient / authentication
**Status:** `TODO`

- [ ] Auth interceptor
- [ ] Error interceptor
- [ ] 401 handling
- [ ] Refresh flow
- [ ] Avoid refresh loops

## State management
**Status:** `TODO`

- [ ] Signals
- [ ] computed
- [ ] effect
- [ ] signal services
- [ ] When NgRx becomes useful

## Socket.IO
**Status:** `TODO`

- [ ] socket.io-client
- [ ] SocketService
- [ ] reconnect
- [ ] RxJS bridge
- [ ] auth

## UI/testing
**Status:** `TODO`

- [ ] Angular Material
- [ ] Responsive UI
- [ ] HTTP testing
- [ ] Component testing

## Checkpoint
**Status:** `TODO`

Build a complete Angular client for the existing API:

- [ ] auth
- [ ] generated API client
- [ ] movies
- [ ] watchlist
- [ ] refresh flow
- [ ] Signals
- [ ] Socket.IO
- [ ] tests

---

# Phase U — Testing & Observability

**Status:** `TODO`

## Test foundation
- [ ] Test runner
- [ ] test structure
- [ ] describe/it/expect
- [ ] mocks
- [ ] fixtures
- [ ] test configuration

## Unit tests
- [ ] service tests
- [ ] repository tests
- [ ] pure business logic
- [ ] coverage thresholds

## Integration
- [ ] Supertest
- [ ] auth headers
- [ ] DB setup
- [ ] realistic API flows

## Testcontainers
- [ ] MySQL container
- [ ] Redis container
- [ ] lifecycle
- [ ] teardown
- [ ] CI integration

## Queue testing
- [ ] processor tests
- [ ] retries
- [ ] failure cases
- [ ] idempotency

## APM / observability
- [ ] APM agent
- [ ] traces
- [ ] errors
- [ ] custom transactions
- [ ] dashboards

## Checkpoint
**Status:** `TODO`

- [ ] unit suite
- [ ] integration suite
- [ ] DB/Redis containers
- [ ] queue tests
- [ ] critical-path e2e coverage

---

# Phase V — Docker / PM2 / CI/CD

**Status:** `TODO`

## Docker
- [ ] Images
- [ ] containers
- [ ] layers
- [ ] Dockerfile
- [ ] `.dockerignore`
- [ ] build cache
- [ ] multi-stage build
- [ ] non-root user

## Compose
- [ ] App
- [ ] MySQL
- [ ] Redis
- [ ] Nginx
- [ ] volumes
- [ ] networks
- [ ] healthchecks

## PM2
- [ ] process management
- [ ] cluster mode
- [ ] ecosystem file
- [ ] logs
- [ ] monitoring
- [ ] graceful reload
- [ ] `pm2-runtime`
- [ ] signal handling
- [ ] when PM2 in Docker is useful vs unnecessary

## Nginx
- [ ] reverse proxy
- [ ] upstream
- [ ] `proxy_pass`
- [ ] SSL termination
- [ ] rate limiting
- [ ] static files
- [ ] load balancing

## CI/CD
- [ ] pipeline YAML
- [ ] install dependencies
- [ ] lint
- [ ] test
- [ ] build
- [ ] Docker build
- [ ] registry push
- [ ] secrets
- [ ] deployment
- [ ] rollback
- [ ] blue-green basics

## Cloud LB
- [ ] target groups
- [ ] health checks
- [ ] managed LB
- [ ] Nginx vs LB
- [ ] SSL certificate
- [ ] sticky sessions

## Checkpoint
**Status:** `TODO`

Deploy:

```text
Git push
  ↓
CI
  ↓
Test
  ↓
Build
  ↓
Docker image
  ↓
Registry
  ↓
Cloud
  ↓
Load balancer
  ↓
Application
```

---

# Phase W — Production Hardening & Capstone

## Security
**Status:** `TODO`

- [ ] OWASP risks
- [ ] SQL injection
- [ ] XSS
- [ ] CSRF
- [ ] input sanitization
- [ ] authentication
- [ ] authorization
- [ ] rate limiting
- [ ] secure headers
- [ ] secure cookies/tokens
- [ ] dependency security

## Observability
**Status:** `TODO`

- [ ] structured logs
- [ ] metrics
- [ ] traces
- [ ] request IDs
- [ ] latency metrics
- [ ] error metrics
- [ ] dashboards

## Performance
**Status:** `TODO`

- [ ] HTTP caching
- [ ] Redis caching
- [ ] cache invalidation
- [ ] N+1
- [ ] query analysis
- [ ] indexing

## API evolution
**Status:** `TODO`

- [ ] `/v1`
- [ ] `/v2`
- [ ] header versioning
- [ ] deprecation
- [ ] migration strategy

## Microservice intro
**Status:** `TODO`

- [ ] Service-to-service HTTP
- [ ] shared DB anti-pattern
- [ ] event-driven architecture
- [ ] queue-based communication
- [ ] strangler pattern
- [ ] when NOT to use microservices

---

# 3-Day Capstone

## Day 1 — Architecture
**Status:** `TODO`

- [ ] Requirements
- [ ] ERD
- [ ] API design
- [ ] OpenAPI contract
- [ ] Angular module plan
- [ ] queue design
- [ ] real-time design
- [ ] deployment architecture
- [ ] security model

## Day 2 — Backend
**Status:** `TODO`

- [ ] auth
- [ ] repositories
- [ ] services
- [ ] transactions
- [ ] Redis
- [ ] queues
- [ ] Socket.IO
- [ ] migrations
- [ ] tests
- [ ] Docker

## Day 3 — Frontend & deployment
**Status:** `TODO`

- [ ] Angular
- [ ] generated API services
- [ ] auth
- [ ] Signals
- [ ] real-time UI
- [ ] CI/CD
- [ ] production deployment
- [ ] observability
- [ ] final security review

---

# Track 5 — System Design

## Foundations
**Status:** `TODO`

- [ ] Vertical vs horizontal scaling
- [ ] Stateless vs stateful
- [ ] Load balancing
- [ ] L4 vs L7
- [ ] Health checks
- [ ] Caching strategies
- [ ] Eviction policies
- [ ] Replication
- [ ] Sharding
- [ ] Partition keys
- [ ] CAP theorem
- [ ] Strong vs eventual consistency
- [ ] SQL vs NoSQL
- [ ] Queues vs pub/sub
- [ ] At-least-once delivery
- [ ] Exactly-once discussion
- [ ] CDN
- [ ] Rate limiting algorithms
- [ ] Map concepts onto my own project

## Fintech-flavored design
**Status:** `TODO`

- [ ] Ledger design
- [ ] Double-entry concepts
- [ ] Idempotency keys
- [ ] Reconciliation
- [ ] Trade/order ledger
- [ ] High-throughput read path
- [ ] Rate-limited API gateway
- [ ] Identify single points of failure
- [ ] Remove SPOFs
- [ ] Explain trade-offs

## Interview practice
**Status:** `TODO`

- [ ] 45-minute mock #1
- [ ] 45-minute mock #2
- [ ] 45-minute mock #3
- [ ] Requirements-first framework
- [ ] Back-of-envelope estimates
- [ ] High-level architecture
- [ ] Deep dive
- [ ] Trade-offs
- [ ] 5 designs I can explain fluently

---

# Track 6 — DSA

## Foundations
**Status:** `TODO`

### Arrays / strings / hashing
- [ ] Two pointers
- [ ] Sliding window
- [ ] Prefix sums
- [ ] Hash maps
- [ ] Hash sets
- [ ] 15–20 problems

### Stacks / queues / linked lists
- [ ] Monotonic stack
- [ ] Queue patterns
- [ ] LRU cache
- [ ] Reverse linked list
- [ ] Cycle detection
- [ ] Merge linked lists
- [ ] 10–15 problems

---

## Trees / graphs / recursion
**Status:** `TODO`

### Trees
- [ ] DFS
- [ ] BFS
- [ ] BST
- [ ] Balanced trees
- [ ] 15–20 problems

### Graphs
- [ ] DFS
- [ ] BFS
- [ ] Topological sort
- [ ] Union-find
- [ ] Shortest path
- [ ] 15–20 problems

### Recursion / backtracking
- [ ] Recursion tree thinking
- [ ] Backtracking template
- [ ] Subsets
- [ ] Permutations
- [ ] Combinations
- [ ] 10 problems

---

## DP / Greedy
**Status:** `TODO`

### Dynamic programming
- [ ] Memoization
- [ ] Tabulation
- [ ] 1D DP
- [ ] 2D DP
- [ ] Knapsack family
- [ ] LIS family
- [ ] Edit distance family
- [ ] 20–25 problems

### Greedy / intervals
- [ ] Greedy intuition
- [ ] Proof intuition
- [ ] Interval scheduling
- [ ] 10 problems

---

## Interview practice
**Status:** `TODO`

- [ ] Timed 45-minute sessions
- [ ] 2 medium problems per session
- [ ] Mistakes log
- [ ] Pattern missed
- [ ] Why I missed it
- [ ] Correct mental model
- [ ] 2–3 mock interviews

---

# Mastery Dashboard

## Backend

| Area | Explain | Implement | Debug | Apply | Defend |
|---|---:|---:|---:|---:|---:|
| Node internals |  |  |  |  |  |
| Express errors |  |  |  |  |  |
| OpenAPI |  |  |  |  |  |
| Security middleware |  |  |  |  |  |
| Uploads |  |  |  |  |  |
| Email |  |  |  |  |  |
| Config/secrets |  |  |  |  |  |
| Sequelize advanced |  |  |  |  |  |
| Repository pattern |  |  |  |  |  |
| Pagination |  |  |  |  |  |
| JWT |  |  |  |  |  |
| Refresh rotation |  |  |  |  |  |
| Redis |  |  |  |  |  |
| Caching |  |  |  |  |  |
| BullMQ |  |  |  |  |  |
| Socket.IO |  |  |  |  |  |
| Angular |  |  |  |  |  |
| Testing |  |  |  |  |  |
| Docker |  |  |  |  |  |
| CI/CD |  |  |  |  |  |
| Production hardening |  |  |  |  |  |

---

# Quiz History

| Date | Phase | Topic | Score | Weak Areas | Action |
|---|---|---|---:|---|---|
| 2026-09-02 | O | Node internals: event loop & streams | 11/15 warm-up | nextTick vs Promise priority; thread-pool ≠ arbitrary JS; serialization math | Revisit setImmediate vs setTimeout |
| 2026-09-02 | O | **Phase O checkpoint** | PASS (concepts 72%; arch ~30%) | isOperational message-hiding; horizontal scaling / shared state | Redis/S3/log-agg → Phase R + System Design |

---

# Mistakes Log

Record the **pattern**, not just the individual bug.

| Date | Topic | Mistake | Root Cause | Correct Mental Model | Revisit |
|---|---|---|---|---|---|
| 2026-09-02 | Config/env (ESM) | `LOG_LEVEL` in `.env` ignored by logger | `dotenv.config()` ran AFTER ESM imports; `logger.js` reads `process.env` at import time → undefined | ESM imports fully evaluate before the importing module's body; load env before any import that reads it (`import "dotenv/config"` first, or `node --env-file`) | Phase O.7 — centralize + validate config |
| 2026-09-02 | Refactors | Incomplete pattern fixes (missing import ×2, half-applied AppError arg swap) | Fixed the flagged instance, not every instance | When fixing a pattern bug, `grep` every call site and fix them together | ongoing |

Examples:

```text
Wrong:
"I forgot how Promise.all works."

Better:
"I treated Promise.all as a concurrency guarantee instead of a promise aggregation mechanism."
```

---

# Technical Debt

| Priority | Area | Debt | Why It Matters | Planned Phase | Status |
|---|---|---|---|---|---|
| P0 | Secrets | `.env` is committed to git (holds `jwt_secret`, DB URL) | Secrets in source control; stay in history even after removal → must untrack + rotate | Now / Phase O.7 | ⚠️ PARTIAL — untracked + gitignored; still in HISTORY → rotate JWT_SECRET |
| P1 | Git hygiene | No root `.gitignore`; `node_modules/`, `.env`, lab `output.txt` untracked/committed | Risk of committing secrets & huge files | Now | ✅ RESOLVED (.gitignore + `uploads/`) |
| P1 | Security | `bcryptjs` (pure JS) blocks the event loop ~100ms per hash in register/login | Native `bcrypt` (already installed) offloads to libuv thread pool | Phase Q | TODO |
| P1 | Naming | `middelware` naming | Reduces clarity / consistency | Refactor checkpoint | TODO |
| P2 | Deps | Both `bcrypt` and `bcryptjs` installed | Redundant; pick one (prefer native `bcrypt`) | Phase Q | TODO |
| P2 | Config | DB creds hardcoded in `src/config/db.js` (`mysql://root:123@…`); `.env db_url` ignored | Secrets in source; env not actually used | Phase O.7 | ✅ RESOLVED (`env.DB_URL`) |
| P3 | Naming | `.env` key `jwt_expries_in` typo (→ `jwt_expires_in`) | Confusing / error-prone when read | Phase O.7 | ✅ RESOLVED (`JWT_EXPIRES_IN`) |
| P3 | Build | `postinstall: "prisma skills sync \|\| exit 0"` references Prisma (stack is Sequelize) | Dead/odd script, fails silently | Anytime | TODO |

---

# Architecture Evolution

Keep a record of how the project changes.

## Version 1 — Current

```text
Routes
  ↓
Controllers
  ↓
Sequelize
  ↓
MySQL
```

## Target backend architecture

```text
Client
  ↓
Nginx
  ↓
Express
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

Cross-cutting:

```text
Express
 ├── Validation
 ├── Authentication
 ├── Authorization
 ├── Error handling
 ├── Logging
 └── Observability
```

Async:

```text
Service
  ↓
BullMQ
  ↓
Worker
  ↓
Email / external integration
```

Caching:

```text
API
 ├── Redis
 └── MySQL
```

Real-time:

```text
API / Socket.IO
       ↓
     Redis
       ↓
Other instances
```

---

# Session Log

## Session template

```md
## YYYY-MM-DD — <topic>

### Learned
- 

### Implemented
- 

### Quiz
Score: /10

### Mastery
- [ ] Explain
- [ ] Implement
- [ ] Debug
- [ ] Apply
- [ ] Defend

### Mistakes
- 

### Technical debt found
- 

### Revision required
- 

### Next session
- 
```

---

## 2026-09-02 — Node internals: event loop, libuv, streams, Buffer

### Learned
- Single-thread event loop; non-blocking I/O via hand-off; `await` unwraps a Promise (envelope vs contents)
- Priority ladder: sync stack → `process.nextTick` → Promise microtasks → macrotasks (timers/IO/setImmediate); microtask queue fully drained between macrotasks
- Why CPU-heavy JS blocks everything (serialization); libuv thread pool runs native ops (fs/dns/crypto), NOT arbitrary JS (→ Worker Threads for that)
- `Buffer` = off-heap raw bytes; `.length` is bytes not chars
- Streams process data in chunks (flat memory); backpressure via `write()` bool + `drain`; `pipeline`/`pipe` handle it

### Implemented
- Event-loop blocking demo (100ms timer fired at 2005ms behind a 2s busy-loop)
- Backpressure lab: naive vs drain-aware writer — naive RSS peak 370MB vs fixed 69MB for identical 191MB output; learned heap vs RSS (Buffers hide from `heapUsed`)

### Quiz
Warm-up 11/15; ordering puzzles 5/5 then 4/5 (nextTick miss); sort 5/6 (thread-pool ≠ JS)

### Mastery (Node internals)
- [x] Explain  [x] Implement  [x] Debug  [ ] Apply  [ ] Defend

### Mistakes (patterns)
- Attributed timer delay to macrotask ordering rather than a blocked call stack
- Assumed libuv thread pool can offload arbitrary JS CPU work (it can't)
- Inverted nextTick vs Promise priority

### Technical debt found
- `.env` committed to git; no root `.gitignore`; hardcoded DB creds in db.js; bcryptjs blocks loop; dual bcrypt libs; `jwt_expries_in` typo; odd prisma postinstall

### Revision required
- setImmediate vs setTimeout / named event-loop phases; Transform streams; apply streams in the project

### Next session
- Phase O topic 2 — Error handling: `AppError`, `asyncHandler`, global error middleware (refactor the movie/watchlist controllers)

---

## 2026-09-02 (cont.) — Error handling · Logging · Security middleware

### Learned
- Global error handling: `AppError` (statusCode + isOperational), 4-arg middleware mounted last, operational-vs-programmer errors, leak prevention
- Express 5 auto-forwards rejected async handlers → no `asyncHandler`/try-catch needed (vs Express 4)
- HTTP status semantics: 400 vs 401 vs 404 vs 409 (Conflict)
- Security: user enumeration (equal responses on both login branches) + timing attack (dummy-hash mitigation → Phase Q)
- Pino structured logging: levels, env `LOG_LEVEL`, pretty(dev)/JSON(prod), `err` serializer, `pino-http` reqId correlation, `redact` for secrets
- Security middleware: Helmet (headers, removes X-Powered-By), CORS (browser-only enforcement, allowlist ≠ firewall), rate limiting (brute-force shield), compression

### Implemented / Applied
- `errorHandler.js` + `appError.js`; refactored watchlistController + authController (dropped try/catch, correct codes, enumeration fix)
- `logger.js` (pino + pino-pretty + redact); `pino-http` mounted; errorHandler logs structured
- `server.js`: helmet, cors, compression, `authLimiter` (5/15min on /auth)
- Verified via isolated harnesses: 409/404/500 shapes + secret non-leak; pretty/JSON/level logging; Authorization/cookie → `[REDACTED]`; CORS wide-open bug caught

### Debug lessons (patterns)
- ReferenceError from incomplete refactor (missing import + missing `next` param) masked the real error as a 500
- "Works but silently wrong": pino `transport` must be a KEY inside options; `cors()` takes ONE options object (a string arg → wildcard `*`)
- Test the REAL path, not just an isolated probe (green `/boom`, broken watchlist)

### Mastery
- Error handling: [x] Explain [x] Implement [x] Debug [x] Apply [ ] Defend
- Logging: [x] Explain [x] Implement [x] Debug [x] Apply [ ] Defend
- Security middleware: [x] Explain [x] Implement [x] Debug [~] Apply (CORS fix pending) [ ] Defend

### Technical debt (still open)
- `.env` still in git HISTORY (rotate `jwt_secret`) · hardcoded `db.js` creds · `bcryptjs` blocks loop · dual bcrypt libs · `.sync()` commented (→ Phase P migrations) · no general rate limiter

### Next session
- Phase O topic 5 — File uploads (Multer): multipart/form-data, validation, size/MIME limits, storage, presigned URLs

---

# Definition of Done

A phase should not be marked `DONE` unless:

- [ ] I can explain the major concepts without notes
- [ ] I implemented the core feature myself
- [ ] I debugged at least one realistic failure
- [ ] I integrated it into the main project
- [ ] I wrote tests where appropriate
- [ ] I understand major security concerns
- [ ] I understand important performance/scaling trade-offs
- [ ] I passed the phase checkpoint
- [ ] I can answer interview-style questions

---

# Golden Rule

> **Do not measure progress by how much Claude writes. Measure progress by how much I can build after Claude stops helping.**
