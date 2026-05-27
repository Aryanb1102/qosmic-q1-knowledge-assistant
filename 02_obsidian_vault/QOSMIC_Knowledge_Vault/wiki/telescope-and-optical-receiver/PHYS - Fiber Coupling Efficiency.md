---
type: physics_concept
status: reviewed
concept_area: optical-receiver
owner: optical-systems
explains:
  - "[[REQ - Support High-Rate Downlink Capture]]"
justifies:
  - "[[DD - Use Fiber-Coupled Optical Receiver Architecture]]"
references:
  - "[[REF - Optical Ground Station Design Literature]]"
---

# PHYS - Fiber Coupling Efficiency

## Summary

Fiber coupling efficiency describes how much collected optical power is successfully coupled into the fiber or receiver path.

## Concept Explanation

A fiber-coupled receiver can make the downstream optical chain more modular, but it is sensitive to beam alignment, wavefront quality, and pointing stability. Small alignment errors can reduce coupling efficiency and therefore reduce link margin.

## Why It Matters for QOSMIC

If QOSMIC uses a fiber-coupled architecture, then telescope pointing, fine tracking, and optical alignment become tightly coupled design concerns. This connects the telescope subsystem directly to the fine pointing subsystem.

## Design Implications

- Fiber coupling benefits modular receiver design.
- Coupling loss must be included in the link budget.
- Fine pointing performance directly affects receiver efficiency.
- Alignment procedures and test fixtures become operationally important.

## Related Requirements

- [[REQ - Support High-Rate Downlink Capture]]
- [[REQ - Maintain Fine Pointing Stability]]

## Related Design Decisions

- [[DD - Use Fiber-Coupled Optical Receiver Architecture]]
- [[DD - Set FSM Bandwidth Target Near 400 Hz]]

## References

- [[REF - Optical Ground Station Design Literature]]