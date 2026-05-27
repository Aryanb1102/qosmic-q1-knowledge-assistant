---
type: component
status: draft
vendor: TBD
part_number: TBD
estimated_cost: TBD after RFQ
lead_time: TBD after RFQ
datasheet: TBD
used_in:
  - "[[SUBSYS - Fine Pointing and Tracking]]"
implements:
  - "[[DD - Set FSM Bandwidth Target Near 400 Hz]]"
  - "[[DD - Separate Coarse and Fine Pointing Loops]]"
risks:
  - actuator resonance
  - control instability
  - procurement lead time
---

# COMP - Candidate Fast Steering Mirror

## Summary

The fast steering mirror is the actuator responsible for high-speed angular correction in the fine pointing loop.

## Function

The FSM corrects residual pointing error after the coarse tracking mount has followed the satellite’s large angular motion. It is intended to handle smaller, faster disturbances.

## Candidate Specifications

- Closed-loop bandwidth target near 400 Hz, subject to validation
- Angular range sufficient for residual correction
- Low latency control interface
- Mechanical resonance profile compatible with control design
- Integration with tracking camera feedback

## Vendor and Procurement Notes

Final vendor selection should compare bandwidth, angular range, mirror size, control interface, lead time, support quality, and cost.

## Implements

- [[DD - Set FSM Bandwidth Target Near 400 Hz]]
- [[DD - Separate Coarse and Fine Pointing Loops]]

## Risks

- Claimed bandwidth may not hold under integrated system conditions.
- High bandwidth may excite mechanical resonance.
- Control-loop tuning may require more testing than expected.
- Lead time may delay prototype integration.

## Alternatives

- Lower-bandwidth FSM
- Voice-coil tip/tilt mirror
- Piezo-driven mirror
- Coarse mount correction only

## References

- [[REF - Adaptive Optics and Atmospheric Turbulence Literature]]