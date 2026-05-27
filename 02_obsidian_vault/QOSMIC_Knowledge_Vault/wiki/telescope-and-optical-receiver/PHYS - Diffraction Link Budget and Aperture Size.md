---
type: physics_concept
status: reviewed
concept_area: optical-link-budget
owner: optical-systems
explains:
  - "[[REQ - Maintain Optical Link During LEO Pass]]"
justifies:
  - "[[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]"
references:
  - "[[REF - Optical Ground Station Design Literature]]"
---

# PHYS - Diffraction Link Budget and Aperture Size

## Summary

Aperture size affects how much optical power the ground station can collect and how much link margin is available during a satellite pass.

## Concept Explanation

Optical downlinks use narrow beams, but the received signal can still be weak because of range, pointing loss, atmospheric effects, optical losses, and detector sensitivity. A larger receiving aperture generally improves collected power, but it also increases mount, alignment, cost, and site-integration complexity.

## Why It Matters for QOSMIC

A 50cm-class ground station is a practical prototype scale because it can offer meaningful optical collection while remaining more deployable than very large research telescopes. The exact aperture choice should be validated against link-budget modelling and target customer downlink parameters.

## Design Implications

- Aperture size affects link margin.
- Larger optics increase mechanical and procurement complexity.
- Telescope design must be evaluated with pointing, receiver architecture, and site conditions.
- Aperture choice cannot be separated from acquisition and tracking performance.

## Related Requirements

- [[REQ - Maintain Optical Link During LEO Pass]]
- [[REQ - Support High-Rate Downlink Capture]]

## Related Design Decisions

- [[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]

## References

- [[REF - Optical Ground Station Design Literature]]