---
name: diagnose
description: Diagnose the true problem being addressed by examining how stated goals relate to underlying problems, surfacing implicit constraints and risks, and revealing gaps between intent and actionable design. Use when planning features, debugging unclear requirements, or ensuring specifications are complete before implementation.
allowed-tools: AskUserQuestion, Read, Grep, Glob
---

# Diagnose: Problem and Requirement Analysis

## Purpose

This skill helps diagnose the **true problem** being addressed before implementation begins. It examines how the stated goal relates to the underlying problem, surfaces implicit constraints and risks, and reveals gaps between intent and actionable design.

## When to Use This Skill

Use this skill when:
- Planning new features or major changes
- Requirements seem vague or incomplete
- You need to understand the "why" behind a request
- Multiple approaches are possible and you need to choose wisely
- There are implicit assumptions that need to be surfaced
- You want to prevent building the wrong thing

## Diagnostic Process

The skill evaluates these aspects and then asks questions using the AskUserQuestion tool to fill the gaps:

### 1. Problem Identification
- **Is this a real, specific problem or a vague aspiration?**
  - Bad: "Make the app better"
  - Good: "Users are abandoning checkout because payment takes 3 steps"

### 2. Symptom vs. Cause Analysis
- **Are the stated concerns symptoms, root causes, or constraints?**
  - Symptom: "The API is slow"
  - Cause: "We're making N+1 database queries"
  - Constraint: "Must support 10k concurrent users"

### 3. Solution Alignment
- **Do the proposed actions logically follow from the problem's structure?**
  - If the problem is "users can't find the search bar," does adding more features solve it?
  - Or should we improve navigation/UI visibility?

### 4. Critical Unknowns
- **Where do critical assumptions, unknowns, or technical ambiguities exist?**
  - Performance requirements
  - Scalability needs
  - Security considerations
  - Integration constraints
  - User experience expectations

## How It Works

1. **Analyze the request**: Break down what was asked for and what problem it's trying to solve

2. **Identify gaps**: Find missing information, unclear requirements, or conflicting constraints

3. **Ask in-depth questions**: Use AskUserQuestion to clarify (NOT obvious questions - deep, architectural questions)

4. **Iterate until complete**: Keep asking until you have a complete specification

## Question Quality Guidelines

**Make sure questions are not obvious. Be very in-depth until the specification is complete.**

### ❌ Avoid Obvious Questions
- "Do you want this feature?" (if they already asked for it)
- "Should I use TypeScript?" (if the project is already in TypeScript)
- "Do you want tests?" (default yes in this codebase)

### ✅ Ask Deep, Architectural Questions
- "This could be implemented with real-time WebSockets or polling. Real-time adds complexity but gives instant updates. Which trade-off fits your use case?"
- "You mentioned 'fast search.' What's the acceptable latency? 100ms? 500ms? This affects whether we need caching, indexing, or can query directly."
- "Should this work offline? If yes, we need local storage and sync logic. If no, we can simplify."
- "Who has permission to do this action? Just admins? All authenticated users? This affects the entire security model."

## Example Workflow

**User request:**
> "Add a feature to export user data"

**Diagnosis process:**
1. **Problem identification**: Why do users need to export? Compliance (GDPR)? Migration? Reporting?
2. **Symptom vs cause**: Is "export" the real need, or do they actually need better reporting in-app?
3. **Solution alignment**: What format (CSV, JSON, PDF)? What data (all fields or filtered)? How often?
4. **Critical unknowns**:
   - Performance: 100 users or 1M users?
   - Security: Who can export whose data?
   - Scope: Historical data or just current state?

**Questions to ask** (using AskUserQuestion):
```
1. What's the primary use case for exporting user data?
   - GDPR compliance (user requests their data)
   - Admin reporting/analytics
   - Migration to another system
   - Backup purposes

2. What format and scope do you need?
   - Format: CSV (simple), JSON (structured), or PDF (formatted report)?
   - Scope: All user data or specific fields?
   - History: Current state only or include historical changes?

3. What are the performance and security constraints?
   - Volume: Exporting 100 users or 1M users?
   - Who can export: Users export their own data, admins export any user's data?
   - Frequency: One-time request or regular scheduled exports?
```

## Tools You Can Use

- **AskUserQuestion**: Gather clarifications and preferences
- **Read**: Review existing code to understand current architecture
- **Grep**: Find similar patterns or implementations in the codebase
- **Glob**: Discover relevant files for context

## Output Format

After diagnosis, provide:

1. **Problem summary**: Clear statement of the real problem being solved
2. **Key constraints**: Technical, business, or user constraints identified
3. **Risks**: Potential pitfalls or areas of concern
4. **Recommendation**: Suggested approach with rationale
5. **Next steps**: What to do once specification is complete

## Example Output

```
## Problem Summary
Users need to export their data for GDPR compliance (right to data portability).

## Key Constraints
- Must complete within 30 seconds (user expectation for "download")
- Must include all PII (legal requirement)
- Only user can export their own data (privacy)
- Format must be machine-readable (GDPR requirement)

## Risks
- Large user datasets (>10MB) may timeout
- Need to sanitize data to prevent injection attacks in CSV
- Export history could reveal sensitive patterns

## Recommendation
Use JSON format (machine-readable, structured) with async job queue for large exports.
Send email with download link when ready (handles timeouts gracefully).

## Next Steps
1. Implement job queue for export processing
2. Add download endpoint with signed URLs (security)
3. Include export history in user dashboard
```

## Anti-Patterns to Avoid

- ❌ Accepting vague requirements without clarification
- ❌ Asking obvious questions that waste time
- ❌ Building features without understanding the "why"
- ❌ Assuming you know what the user needs
- ❌ Skipping constraint analysis

## Success Criteria

You've successfully diagnosed when:
- ✅ You understand the root problem, not just symptoms
- ✅ You've identified all critical constraints and risks
- ✅ You have enough information to write a detailed implementation plan
- ✅ The user has made informed decisions on trade-offs
- ✅ There are no major unknowns or ambiguities remaining
