---
type: design_decision
status: canonical
owner: optical-systems
decision_date: 2026-01-15
linked_requirements:
  - "[[REQ - Support High-Rate Downlink Capture]]"
justified_by:
  - "[[PHYS - Fiber Coupling Efficiency]]"
implemented_by:
  - optical receiver module
depends_on:
  - "[[REQ - Maintain Fine Pointing Stability]]"
  - "[[SUBSYS - Fine Pointing and Tracking]]"
supersedes:
superseded_by:
tested_by:
  - fiber coupling alignment test
references:
  - "[[REF - Optical Ground Station Design Literature]]"
---

# DD - Use Fiber-Coupled Optical Receiver Architecture

## Summary

Use a fiber-coupled receiver path as the representative architecture for the sample vault, because it allows modular downstream receiver design but creates strict alignment and pointing requirements.

## Context

A fiber-coupled architecture can simplify modular receiver integration, but coupling efficiency becomes sensitive to pointing error, optical alignment, and wavefront quality.

## Decision

Route the collected optical signal into a fiber-coupled receiver path for downstream detection and processing.

## Alternatives Considered

- Free-space receiver path
- Direct detector placement at focal plane
- Hybrid architecture with removable fiber-coupling stage

## Trade-offs

Fiber coupling improves modularity and can simplify downstream receiver packaging. However, it increases sensitivity to pointing and alignment errors. This means the receiver decision directly depends on the fine pointing subsystem.

## Physics Rationale

This decision is justified by [[PHYS - Fiber Coupling Efficiency]] and depends on [[REQ - Maintain Fine Pointing Stability]].

## Implementation

Implementation requires careful alignment procedures, coupling-loss measurement, and integration with the fine pointing loop.

## Testing and Validation

Testing should measure coupling efficiency under static alignment and dynamic disturbance conditions.

## Open Questions

- What coupling loss is acceptable for the first prototype?
- Should early prototypes use a more forgiving free-space path before moving to fiber coupling?
- How frequently will field alignment be required?

## Links

- derives-from: [[REQ - Support High-Rate Downlink Capture]]
- justified-by: [[PHYS - Fiber Coupling Efficiency]]
- depends-on: [[REQ - Maintain Fine Pointing Stability]], [[SUBSYS - Fine Pointing and Tracking]]
- tested-by: fiber coupling alignment test
- references: [[REF - Optical Ground Station Design Literature]]