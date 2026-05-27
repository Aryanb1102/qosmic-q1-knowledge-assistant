---
type: design_decision
status: canonical
owner: controls-and-optics
decision_date: 2026-01-15
linked_requirements:
  - "[[REQ - Maintain Fine Pointing Stability]]"
  - "[[REQ - Reject Platform Jitter and Beam Wander]]"
justified_by:
  - "[[PHYS - Pointing Error and Optical Link Margin]]"
implemented_by:
  - "[[COMP - Candidate Fast Steering Mirror]]"
  - "[[COMP - Candidate Tracking Camera]]"
depends_on:
  - "[[SUBSYS - Telescope and Optical Receiver]]"
supersedes:
superseded_by:
tested_by:
  - closed-loop tracking test
references:
  - "[[REF - Adaptive Optics and Atmospheric Turbulence Literature]]"
---

# DD - Separate Coarse and Fine Pointing Loops

## Summary

Use separate coarse and fine pointing loops so the telescope mount handles large satellite-tracking motion while the fine pointing system corrects smaller, faster residual disturbances.

## Context

A LEO satellite pass requires large angular tracking across the sky. A telescope mount can handle the large motion, but it is not ideal for high-speed small-angle corrections.

## Decision

Separate the tracking architecture into a coarse pointing loop and a fine pointing loop.

## Alternatives Considered

- Coarse mount only
- Fine pointing only
- Single integrated loop for all tracking correction
- Post-processing compensation without optical correction

## Trade-offs

Separating the loops improves control clarity and allows each actuator to operate in a realistic frequency range. The cost is additional calibration, control-system complexity, and integration effort.

## Physics Rationale

This decision is justified by [[PHYS - Pointing Error and Optical Link Margin]]. Pointing loss directly affects the optical link, so correction must happen at the appropriate physical layer.

## Implementation

The coarse mount performs satellite tracking. The fine pointing loop uses [[COMP - Candidate Tracking Camera]] and [[COMP - Candidate Fast Steering Mirror]] to correct residual beam position error.

## Testing and Validation

Validation should include step response, disturbance rejection, and end-to-end pointing stability tests.

## Open Questions

- Where should the control bandwidth split between coarse and fine loops be set?
- How should loop handoff be handled during acquisition and loss-of-lock conditions?

## Links

- derives-from: [[REQ - Maintain Fine Pointing Stability]]
- justified-by: [[PHYS - Pointing Error and Optical Link Margin]]
- implemented-by: [[COMP - Candidate Fast Steering Mirror]], [[COMP - Candidate Tracking Camera]]
- depends-on: [[SUBSYS - Telescope and Optical Receiver]]