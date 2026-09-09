import sys

def inject_content(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_section = """
<!-- ================= SECTION BEST PRACTICES ================= -->
<section id="best-practices">
<div class="sec-tag">Advanced 09</div>
<h2>Best Practices & Optimal Examples Library</h2>
<p>To ensure you push Codex to its absolute limits, we've compiled the industry's universally recognized best techniques, standard command combinations, and the most bulletproof Prompt templates, making it easy for anyone to learn and replicate.</p>

<h3 data-reveal>1. The Ultimate Prompt Template: Zero-Hallucination TDD</h3>
<p>This is the task assignment template with the highest success rate in real-world enterprise projects. By enforcing strict constraints and acceptance criteria, it prevents the model from "freestyling":</p>
<pre><code>&gt; [Goal] Add Refresh Token sliding window renewal logic to src/auth/jwt.ts.
  [Context] Read docs/auth-flow.md and the current jwt.ts code.
  [Constraints]
  1. Only modify jwt.ts and corresponding test files. Do NOT touch the routes module.
  2. Keep the existing HMAC-SHA256 signature algorithm. Do not introduce new npm libraries.
  3. Beware of concurrent locks; prevent the same Token from being refreshed twice.
  [Acceptance]
  First, write 3 test cases in tests/auth/jwt.test.ts (including a concurrency test).
  Run the tests until they all pass green. Finally, show me the /diff.</code></pre>

<h3 data-reveal>2. Four Power-User Scenarios & "Killer" Command Combos</h3>
<table class="tbl">
  <tr><th>Scenario</th><th>Optimal Command / Action</th><th>Why is it optimal?</th></tr>
  <tr>
    <td><strong>1. "Safe Snapshot" Before Major Refactoring</strong></td>
    <td><code>git add . && git commit -m "WIP" && codex exec fork</code></td>
    <td>Leverages the 0.148.0 headless fork capability. Keeps the main session as a safe anchor, branching out to attempt dangerous refactoring. If it fails, trash the branch without polluting the main timeline.</td>
  </tr>
  <tr>
    <td><strong>2. Unattended CI/CD Automation</strong></td>
    <td><code>codex exec --sandbox workspace-write --approve-for-me "Fix lint errors based on .github/ISSUE_TEMPLATE"</code></td>
    <td>Strips interactivity completely. <code>--approve-for-me</code> allows Codex to auto-approve safe commands within the designated sandbox, without human intervention.</td>
  </tr>
  <tr>
    <td><strong>3. Handling Massive Logs & Errors</strong></td>
    <td><code>npm run build > build-error.log</code> <br> Then in Codex: <code>Read build-error.log and fix the errors</code></td>
    <td><strong>Never paste a 10,000-line error dump into the chat!</strong> It instantly exhausts context tokens and causes hallucination. Piping to a file and instructing Codex to read it is highly precise and consumes minimal context.</td>
  </tr>
  <tr>
    <td><strong>4. Knowledge Preservation & Sharing</strong></td>
    <td>Upon task completion, type: <code>/export</code></td>
    <td>Instantly dumps a brilliant debugging session or architecture decision process into a clean Markdown file. Drop it directly into Notion/Confluence as team wiki, complete with coherent code blocks.</td>
  </tr>
</table>

<h3 data-reveal>3. Codebase "Cold Start" Optimal Onboarding</h3>
<p>When inheriting legacy code or a massive new repository, use this exact combo to help Codex build a fast mental index of the project:</p>
<ol class="steps">
  <li><strong>Global Scan & Cartography</strong>: Run <code>Analyze the entire src/ directory, summarize its architectural patterns, and write a high-level ARCHITECTURE.md</code>.</li>
  <li><strong>Establish Defensive Guardrails</strong>: Follow up with <code>Based on your analysis, generate a strict AGENTS.md (containing forbidden actions and specific coding standards for this project) for future AI sessions to obey</code>.</li>
  <li><strong>One-Click Noise Cleanup</strong>: Run <code>/compact</code>. This compresses the lengthy reading process into a summary memory, freeing up maximum Token space for actual feature development.</li>
</ol>
</section>

<div class="divider"></div>
"""

    parts = content.split('<h2>Automated Pipelines & Playbook</h2>')
    if len(parts) == 2:
        pre_split = parts[0].rfind('<section')
        if pre_split != -1:
            final_content = parts[0][:pre_split] + new_section + parts[0][pre_split:] + '<h2>Automated Pipelines & Playbook</h2>' + parts[1]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(final_content)
            print(f"Successfully updated {filepath}")
        else:
            print("Could not find section start.")
    else:
        print("Could not find split string.")

inject_content("topics/codex-guide.en.html")
