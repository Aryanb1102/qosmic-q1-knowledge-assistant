---
type: physics_concept
status: reviewed
concept_area: pointing-and-link-margin
owner: controls-and-optics
explains:
  - "[[REQ - Maintain Fine Pointing Stability]]"
justifies:
  - "[[DD - Separate Coarse and Fine Pointing Loops]]"
  - "[[DD - Set FSM Bandwidth Target Near 400 Hz]]"
references:
  - "[[REF - Adaptive Optics and Atmospheric Turbulence Literature]]"
---

# PHYS - Pointing Error and Optical Link Margin

## Summary

Pointing error reduces the useful optical power delivered to the receiver and can directly reduce communication reliability.

## Concept Explanation

In an optical downlink, the received beam must remain aligned with the telescope and receiver path. Even small angular errors can reduce signal strength, especially when the receiver architecture has narrow coupling tolerances.

## Why It Matters for QOSMIC

The link budget is not only an optical-power calculation. It must include pointing loss, coupling loss, atmospheric effects, and tracking performance. This creates a direct relationship between control-system performance and commercial service reliability.

## Design Implications

- Pointing error must be part of the link budget.
- Coarse and fine tracking should be modelled separately.
- FSM bandwidth should be justified by disturbance rejection needs.
- Receiver architecture and pointing architecture must be co-designed.

## Related Requirements

- [[REQ - Maintain Fine Pointing Stability]]
- [[REQ - Reject Platform Jitter and Beam Wander]]

## Related Design Decisions

- [[DD - Separate Coarse and Fine Pointing Loops]]
- [[DD - Set FSM Bandwidth Target Near 400 Hz]]

## References

- [[REF - Adaptive Optics and Atmospheric Turbulence Literature]]