---
type: design_decision
status: reviewed
owner: controls-and-optics
decision_date: 2026-01-15
linked_requirements:
  - "[[REQ - Maintain Fine Pointing Stability]]"
  - "[[REQ - Reject Platform Jitter and Beam Wander]]"
justified_by:
  - "[[PHYS - Atmospheric Turbulence and Beam Wander]]"
  - "[[PHYS - Pointing Error and Optical Link Margin]]"
implemented_by:
  - "[[COMP - Candidate Fast Steering Mirror]]"
depends_on:
  - "[[DD - Separate Coarse and Fine Pointing Loops]]"
supersedes:
superseded_by:
tested_by:
  - disturbance rejection test
references:
  - "[[REF - Adaptive Optics and Atmospheric Turbulence Literature]]"
---

# DD - Set FSM Bandwidth Target Near 400 Hz

## Summary

Set the fast steering mirror control bandwidth target near 400 Hz as a representative design target for correcting residual pointing disturbances after coarse tracking.

## Context

The assessment prompt specifically asks why the fine pointing mirror needs 400 Hz bandwidth. This note treats 400 Hz as a design target that must be validated against measured disturbance spectra, actuator resonance, and closed-loop stability limits.

## Decision

Use an FSM bandwidth target near 400 Hz for the fine pointing control loop, subject to validation through testing.

## Alternatives Considered

- Coarse mount only
- Low-bandwidth FSM
- Higher-bandwidth FSM
- Adaptive optics-first correction

## Trade-offs

A higher bandwidth target can improve disturbance rejection, but it increases actuator cost, control complexity, noise sensitivity, and the risk of exciting mechanical resonances. A lower bandwidth design may be cheaper and simpler but may not reject enough pointing disturbance.

## Physics Rationale

This decision derives from [[REQ - Reject Platform Jitter and Beam Wander]] and is justified by [[PHYS - Atmospheric Turbulence and Beam Wander]] and [[PHYS - Pointing Error and Optical Link Margin]].

## Implementation

The decision is implemented through [[COMP - Candidate Fast Steering Mirror]] and depends on the tracking sensor described in [[COMP - Candidate Tracking Camera]].

## Testing and Validation

The 400 Hz target should be tested using disturbance injection and closed-loop tracking measurements. It should not be treated as final until site and hardware data confirm the required correction bandwidth.

## Open Questions

- What is the actual disturbance spectrum at the ground station site?
- What resonance limits does the selected FSM introduce?
- Is 400 Hz necessary for the first prototype or only for later customer-grade operation?

## Links

- derives-from: [[REQ - Maintain Fine Pointing Stability]], [[REQ - Reject Platform Jitter and Beam Wander]]
- justified-by: [[PHYS - Atmospheric Turbulence and Beam Wander]], [[PHYS - Pointing Error and Optical Link Margin]]
- implemented-by: [[COMP - Candidate Fast Steering Mirror]]
- depends-on: [[DD - Separate Coarse and Fine Pointing Loops]]
- tested-by: disturbance rejection test