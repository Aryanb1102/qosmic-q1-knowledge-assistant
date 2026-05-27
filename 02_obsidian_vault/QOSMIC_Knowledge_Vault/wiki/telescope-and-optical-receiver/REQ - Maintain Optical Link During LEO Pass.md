---
type: requirement
status: canonical
requirement_id: REQ-OPT-001
priority: high
owner: systems-engineering
verification_method: end-to-end link test
source: prototype mission requirement
derived_decisions:
  - "[[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]"
  - "[[DD - Use Fiber-Coupled Optical Receiver Architecture]]"
tested_by:
  - closed-loop satellite pass test
---

# REQ - Maintain Optical Link During LEO Pass

## Summary

The ground station must maintain a usable optical communication link during the available window of a LEO satellite pass.

## Requirement Statement

The optical ground station should collect, track, and process the downlink signal for the usable duration of a LEO pass under expected site and weather conditions.

## Why This Requirement Exists

LEO passes are short and dynamic. The satellite moves quickly across the sky, the received beam is narrow, and atmospheric effects can disturb the received signal. If the link is lost repeatedly during the pass, the station cannot deliver reliable high-rate downlink service.

## Acceptance Criteria

- The telescope can acquire and track the satellite during the pass.
- The receiver path maintains enough signal quality for downstream demodulation.
- Fine pointing corrections remain stable during expected disturbance levels.
- Data loss events are logged and correlated with pointing, weather, and receiver telemetry.

## Verification Method

End-to-end link tests during controlled passes or hardware-in-the-loop simulations.

## Related Design Decisions

- [[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]
- [[DD - Use Fiber-Coupled Optical Receiver Architecture]]
- [[DD - Separate Coarse and Fine Pointing Loops]]

## Open Questions

- What minimum link availability is required for first commercial service?
- What weather and turbulence thresholds define an operational pass?