---
type: requirement
status: canonical
requirement_id: REQ-FPT-002
priority: medium
owner: controls-and-optics
verification_method: disturbance rejection test
source: site and mount disturbance assumptions
derived_decisions:
  - "[[DD - Set FSM Bandwidth Target Near 400 Hz]]"
tested_by:
  - disturbance rejection test
---

# REQ - Reject Platform Jitter and Beam Wander

## Summary

The fine pointing system must reject higher-frequency disturbances that cannot be adequately corrected by the coarse telescope mount.

## Requirement Statement

The system should reduce the effect of residual mount jitter, vibration, and atmospheric beam wander on the receiver path.

## Why This Requirement Exists

A large telescope mount is suitable for coarse tracking but not for fast small-angle corrections. A separate fast correction stage is needed when disturbances occur faster than the mount can respond.

## Acceptance Criteria

- Disturbance rejection is demonstrated over the relevant frequency range.
- The control system avoids exciting actuator or structural resonances.
- Performance is validated against measured site and mount disturbance spectra.

## Verification Method

Disturbance injection and closed-loop rejection testing.

## Related Design Decisions

- [[DD - Set FSM Bandwidth Target Near 400 Hz]]
- [[DD - Separate Coarse and Fine Pointing Loops]]

## Open Questions

- Which disturbance frequencies dominate at the chosen site?
- How much of the correction burden should fall on the FSM versus software filtering?