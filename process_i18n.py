import os
import glob
import re

target_files = [
    "index.html",
    "404.html",
    "topics/ai-capability-expansion.html",
    "topics/ai-leverage-guide.html",
    "topics/ai-ui-design-collab.html",
    "topics/android-crash-anr.html",
    "topics/antigravity-usage.html",
    "topics/claude-code-guide.html",
    "topics/codex-guide.html",
    "topics/env-auth-clinic.html",
    "topics/google-ai-ecosystem.html",
    "topics/ops-basics.html",
    "topics/pencil-claude-code-best-practices.html",
    "topics/pencil-docs-zh.html",
    "topics/prompt-context-engineering.html",
    "topics/toolchain-changelog.html",
    "topics/docker/01-intro.html",
    "topics/docker/02-setup.html",
    "topics/docker/03-core-concepts.html",
    "topics/docker/04-dockerfile.html",
    "topics/docker/05-volumes.html",
    "topics/docker/06-compose.html",
    "topics/docker/07-best-practices.html"
]

script_tag_template = '<script src="{prefix}assets/js/i18n.js"></script>'
button_html = '\n    <button id="lang-toggle" style="background:none;border:1px solid var(--border-2);border-radius:6px;padding:2px 8px;cursor:pointer;font-size:12px;color:var(--text-2);font-weight:600;margin-right:8px;font-family:var(--font);">EN</button>'

for file_path in target_files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Determine relative prefix
    depth = file_path.count('/')
    prefix = './' if depth == 0 else '../' * depth

    script_tag = script_tag_template.format(prefix=prefix)
    
    # Inject script tag before </head>
    if "assets/js/i18n.js" not in content:
        content = content.replace("</head>", f"  {script_tag}\n</head>")

    # Inject button inside <div class="right">
    if 'id="lang-toggle"' not in content:
        content = re.sub(r'(<div class="right">)', r'\1' + button_html, content, count=1)

    # Save original file
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    # Duplicate to .en.html
    en_file_path = file_path.replace(".html", ".en.html")
    with open(en_file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Batch injection and duplication complete.")
