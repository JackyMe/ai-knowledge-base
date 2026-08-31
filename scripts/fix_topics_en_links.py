import re

path = "assets/js/topics.en.js"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace href: "topics/...html" with "topics/...en.html"
def replace_href(m):
    prefix = m.group(1) # e.g. href: "
    url = m.group(2)    # e.g. topics/ai-leverage-guide.html#matrix
    suffix = m.group(3) # e.g. "
    
    if url.startswith("http://") or url.startswith("https://"):
        return m.group(0)
    
    parts = url.split("#", 1)
    base = parts[0]
    hash_part = f"#{parts[1]}" if len(parts) > 1 else ""
    
    if base.endswith(".html") and not base.endswith(".en.html"):
        new_base = base[:-5] + ".en.html"
        return f"{prefix}{new_base}{hash_part}{suffix}"
    return m.group(0)

new_content = re.sub(r'(href:\s*["\'])([^"\']+)(["\'])', replace_href, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("topics.en.js hrefs updated.")
