---
type: requirement
status: canonical
requirement_id: REQ-FPT-001
priority: high
owner: controls-and-optics
verification_method: closed-loop pointing stability test
source: optical link margin requirement
derived_decisions:
  - "[[DD - Separate Coarse and Fine Pointing Loops]]"
  - "[[DD - Set FSM Bandwidth Target Near 400 Hz]]"
tested_by:
  - closed-loop pointing stability test
---

# REQ - Maintain Fine Pointing Stability

## Summary

The ground station must maintain fine pointing stability so the received optical beam remains aligned with the receiver path.

## Requirement Statement

The fine pointing system should correct residual pointing errors that remain after coarse telescope tracking.

## Why This Requirement Exists

Optical links are sensitive to angular pointing error. Small errors can reduce collected power, lower fiber coupling efficiency, and reduce link margin. The telescope may collect light, but the receiver may still lose usable signal if the beam is not held accurately.

## Acceptance Criteria

- Residual pointing error remains within the optical receiver’s tolerance.
- The control loop remains stable during representative tracking profiles.
- Pointing performance is logged during each pass.
- Loss of lock is detected and reported.

## Verification Method

Closed-loop pointing stability test using representative disturbance inputs.

## Related Design Decisions

- [[DD - Separate Coarse and Fine Pointing Loops]]
- [[DD - Set FSM Bandwidth Target Near 400 Hz]]

## Open Questions

- What measured pointing error threshold is acceptable for the selected receiver architecture?
- What part of the pointing error budget is allocated to the FSM?