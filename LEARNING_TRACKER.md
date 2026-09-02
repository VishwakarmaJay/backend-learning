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
**Phase:** O — Node.js & Express v5 Core  
**Current topic:** Node.js internals — `REVIEW` (core demonstrated 2026-09-02); next → Error handling (AppError, asyncHandler, global error middleware)  
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
**Status:** `TODO`

- [ ] Understand OpenAPI
- [ ] Define schemas
- [ ] Generate Swagger/OpenAPI docs
- [ ] Add route documentation
- [ ] Add authentication documentation
- [ ] Add request/response schemas
- [ ] Integrate Swagger UI
- [ ] Connect validation schema and API contract where appropriate

Checkpoint:

- [ ] Document auth API
- [ ] Document movie API
- [ ] Document watchlist API

---

### 4. Logging + security middleware
**Status:** `TODO`

- [ ] Pino
- [ ] Structured logs
- [ ] Log levels
- [ ] Request correlation/request IDs
- [ ] Helmet
- [ ] CORS
- [ ] Rate limiting
- [ ] Compression
- [ ] Avoid logging secrets/tokens

---

### 5. File uploads
**Status:** `TODO`

- [ ] Understand multipart/form-data
- [ ] Multer
- [ ] File validation
- [ ] Size limits
- [ ] MIME/type handling
- [ ] Object storage
- [ ] Presigned upload URLs
- [ ] Secure download strategy
- [ ] Failure cleanup

---

### 6. Transactional email
**Status:** `TODO`

- [ ] Email provider SDK
- [ ] Email template
- [ ] Configuration
- [ ] Sandbox vs production
- [ ] Bounce handling
- [ ] Retry strategy
- [ ] Move sending to async queue later

---

### 7. Environment configuration & secrets
**Status:** `TODO`

- [ ] Validate environment variables
- [ ] Create typed config layer
- [ ] Fail fast on invalid config
- [ ] Separate development/test/production config
- [ ] Secret storage concepts
- [ ] Never commit secrets
- [ ] Rotate credentials conceptually

---

### 8. Phase O checkpoint
**Status:** `TODO`

- [ ] 10 concept questions
- [ ] 2 debugging scenarios
- [ ] Mini REST API
- [ ] Zod validation
- [ ] AppError
- [ ] async handler
- [ ] Swagger/OpenAPI
- [ ] Pino
- [ ] security middleware
- [ ] checkpoint interview

---

# Phase P — MySQL & Sequelize v6

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

---

# Mistakes Log

Record the **pattern**, not just the individual bug.

| Date | Topic | Mistake | Root Cause | Correct Mental Model | Revisit |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

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
| P0 | Secrets | `.env` is committed to git (holds `jwt_secret`, DB URL) | Secrets in source control; stay in history even after removal → must untrack + rotate | Now / Phase O.7 | TODO |
| P1 | Git hygiene | No root `.gitignore`; `node_modules/`, `.env`, lab `output.txt` untracked/committed | Risk of committing secrets & huge files | Now | TODO |
| P1 | Security | `bcryptjs` (pure JS) blocks the event loop ~100ms per hash in register/login | Native `bcrypt` (already installed) offloads to libuv thread pool | Phase Q | TODO |
| P1 | Naming | `middelware` naming | Reduces clarity / consistency | Refactor checkpoint | TODO |
| P2 | Deps | Both `bcrypt` and `bcryptjs` installed | Redundant; pick one (prefer native `bcrypt`) | Phase Q | TODO |
| P2 | Config | DB creds hardcoded in `src/config/db.js` (`mysql://root:123@…`); `.env db_url` ignored | Secrets in source; env not actually used | Phase O.7 | TODO |
| P3 | Naming | `.env` key `jwt_expries_in` typo (→ `jwt_expires_in`) | Confusing / error-prone when read | Phase O.7 | TODO |
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
