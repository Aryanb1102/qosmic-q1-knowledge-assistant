---
type: component
status: draft
vendor: TBD
part_number: TBD
estimated_cost: TBD after RFQ
lead_time: TBD after RFQ
datasheet: TBD
used_in:
  - "[[SUBSYS - Telescope and Optical Receiver]]"
implements:
  - "[[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]"
risks:
  - alignment sensitivity
  - procurement lead time
  - mount integration
---

# COMP - Candidate 50cm Telescope Assembly

## Summary

This component note represents the candidate 50cm-class telescope assembly for the sample optical ground station vault.

## Function

The telescope assembly collects the incoming optical downlink signal and routes it toward the receiver path.

## Candidate Specifications

- 50cm-class receiving aperture
- Optical design suitable for acquisition and tracking use cases
- Mechanically compatible with tracking mount and receiver bench
- Alignment procedure suitable for field operation

## Vendor and Procurement Notes

Vendor selection should consider optical quality, lead time, serviceability, export/import constraints, and mount compatibility.

## Implements

- [[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]

## Risks

- Long procurement lead time
- Alignment sensitivity
- Shipping and customs risk
- Mechanical interface mismatch
- Insufficient field serviceability

## Alternatives

- Smaller aperture prototype telescope
- Larger research-grade telescope
- Commercial off-the-shelf telescope assembly

## References

- [[REF - Optical Ground Station Design Literature]]