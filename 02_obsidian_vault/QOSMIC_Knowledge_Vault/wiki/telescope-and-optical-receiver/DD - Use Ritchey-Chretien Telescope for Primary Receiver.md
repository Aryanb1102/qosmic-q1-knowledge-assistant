---
type: design_decision
status: canonical
owner: optical-systems
decision_date: 2026-01-15
linked_requirements:
  - "[[REQ - Maintain Optical Link During LEO Pass]]"
  - "[[REQ - Support High-Rate Downlink Capture]]"
justified_by:
  - "[[PHYS - Diffraction Link Budget and Aperture Size]]"
implemented_by:
  - "[[COMP - Candidate 50cm Telescope Assembly]]"
depends_on:
  - "[[SUBSYS - Fine Pointing and Tracking]]"
supersedes:
superseded_by:
tested_by:
  - optical alignment and acquisition test
references:
  - "[[REF - Optical Ground Station Design Literature]]"
---

# DD - Use Ritchey-Chretien Telescope for Primary Receiver

## Summary

The prototype knowledge graph records a Ritchey-Chretien telescope as the representative primary receiver architecture because it is a plausible optical design for a ground station requiring good image quality over a usable field while managing aberrations.

## Context

The QOSMIC prompt mentions the need to explain why a Ritchey-Chretien telescope was chosen. This note treats that as a sample design decision for the vault. In a production system, this note would be revised using QOSMIC’s internal optical design files, test data, and supplier constraints.

## Decision

Use a Ritchey-Chretien telescope design as the representative primary receiver architecture for the sample optical ground station vault.

## Alternatives Considered

- Newtonian telescope
- Classical Cassegrain telescope
- Commercial off-the-shelf telescope assembly
- Larger research-grade telescope

## Trade-offs

A Ritchey-Chretien design can offer strong optical performance for imaging and tracking use cases, but it can be more expensive and alignment-sensitive than simpler telescope designs. A larger telescope may improve collection but increases mechanical complexity, cost, and deployment burden.

## Physics Rationale

This decision derives from [[REQ - Maintain Optical Link During LEO Pass]] and is justified by [[PHYS - Diffraction Link Budget and Aperture Size]]. The telescope choice affects collected power, optical quality, acquisition, and downstream receiver performance.

## Implementation

This decision is implemented by [[COMP - Candidate 50cm Telescope Assembly]].

## Testing and Validation

Validation should include optical alignment, acquisition performance, pointing integration, and link-budget verification.

## Open Questions

- What is the exact field-of-view requirement?
- What alignment tolerance is acceptable for field deployment?
- What is the cost and lead-time difference versus simpler telescope options?

## Links

- derives-from: [[REQ - Maintain Optical Link During LEO Pass]]
- justified-by: [[PHYS - Diffraction Link Budget and Aperture Size]]
- implemented-by: [[COMP - Candidate 50cm Telescope Assembly]]
- depends-on: [[SUBSYS - Fine Pointing and Tracking]]
- references: [[REF - Optical Ground Station Design Literature]]