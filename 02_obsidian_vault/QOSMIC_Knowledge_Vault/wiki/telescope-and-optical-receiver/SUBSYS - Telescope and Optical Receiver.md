---
type: subsystem
status: canonical
owner: optical-systems
last_reviewed: 2026-01-15
related_requirements:
  - "[[REQ - Maintain Optical Link During LEO Pass]]"
  - "[[REQ - Support High-Rate Downlink Capture]]"
related_design_decisions:
  - "[[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]"
  - "[[DD - Use Fiber-Coupled Optical Receiver Architecture]]"
related_components:
  - "[[COMP - Candidate 50cm Telescope Assembly]]"
related_physics:
  - "[[PHYS - Diffraction Link Budget and Aperture Size]]"
  - "[[PHYS - Fiber Coupling Efficiency]]"
references:
  - "[[REF - Optical Ground Station Design Literature]]"
---

# SUBSYS - Telescope and Optical Receiver

## Summary

The telescope and optical receiver subsystem collects the incoming optical signal from a LEO satellite, concentrates it through the receiving telescope, and routes the optical energy toward the receiver chain for detection, demodulation, and downstream processing.

This subsystem is the first physical interface between the satellite downlink and the ground station. Its design choices strongly affect link margin, pointing tolerance, fiber coupling efficiency, and receiver sensitivity.

## Role in the Ground Station

During a satellite pass, the telescope must collect a weak, fast-moving optical signal while the rest of the system tracks the satellite and corrects pointing error. The receiver side must then preserve as much collected optical power as possible so that downstream electronics can recover the data stream.

The subsystem connects directly to:

- [[SUBSYS - Fine Pointing and Tracking]]
- [[REQ - Maintain Optical Link During LEO Pass]]
- [[REQ - Support High-Rate Downlink Capture]]
- [[PHYS - Diffraction Link Budget and Aperture Size]]
- [[PHYS - Fiber Coupling Efficiency]]

## Key Requirements

- [[REQ - Maintain Optical Link During LEO Pass]]
- [[REQ - Support High-Rate Downlink Capture]]

The telescope and receiver must maintain adequate optical collection and signal quality throughout the usable portion of a LEO pass. This means the subsystem cannot be designed independently of tracking, atmospheric effects, and receiver sensitivity.

## Major Design Decisions

- [[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]
- [[DD - Use Fiber-Coupled Optical Receiver Architecture]]

These decisions are treated as separate design-decision notes because each has different trade-offs. The telescope choice affects optical quality, mechanical integration, and field performance. The receiver architecture affects coupling loss, alignment sensitivity, modularity, and downstream component selection.

## Major Components

- [[COMP - Candidate 50cm Telescope Assembly]]

The component note records candidate vendor, procurement, lead-time, and technical-risk information. In a production vault, this would be connected to datasheets, procurement records, inspection results, and test reports.

## Dependencies

This subsystem depends on the fine pointing system because optical collection alone is not sufficient. If pointing error is too high, the collected beam may not couple efficiently into the receiver path.

Key dependency:

- [[SUBSYS - Fine Pointing and Tracking]]

## Open Questions

- What are the measured seeing conditions and turbulence statistics at the intended ground-station site?
- What link margin is required for the first satellite downlink demonstration?
- How much receiver loss can be tolerated before the communication link becomes unreliable?
- Should early prototypes prioritize alignment flexibility over compact packaging?

## Links

- derives-from: [[REQ - Maintain Optical Link During LEO Pass]], [[REQ - Support High-Rate Downlink Capture]]
- justified-by: [[PHYS - Diffraction Link Budget and Aperture Size]], [[PHYS - Fiber Coupling Efficiency]]
- depends-on: [[SUBSYS - Fine Pointing and Tracking]]
- implemented-by: [[COMP - Candidate 50cm Telescope Assembly]]
- references: [[REF - Optical Ground Station Design Literature]]