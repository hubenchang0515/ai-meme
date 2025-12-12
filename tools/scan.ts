import fs from 'fs/promises';
import path from 'path/posix';
import crypto from 'crypto';
import type { Item } from '../src/utils/catalog'

// 计算字符串的 SHA256 哈希值
function sha256String(data: string): string {
  return crypto.createHash('sha256')
    .update(data)
    .digest('hex');
}

// 检查文件是否存在
async function exist(path:string) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

// 加载一个目录
async function load(dir:string, root:string='public/meme') {
    const dirpath = path.join(root, dir);
    const preview = path.join(dirpath, 'preview.png');
    const raw = path.join(dirpath, 'raw.png');
    if (!await exist(preview)) return;
    
    const item:Item = {
        dir: dir,
        preview: 'preview.png',
        raw: await exist(preview) ? 'raw.png' : undefined,
        images: [],
    }
    const files = await fs.readdir(dirpath, { withFileTypes: true });
    for (const file of files) {
        if (!file.name.startsWith('meme_')) {
            continue;
        }

        item.images.push(file.name);
    }

    return item;
}

// 扫描
async function scan(dir:string='', root:string='public/meme') {
    const items:Item[] = [];
    const dirpath = path.join(root, dir);
    const files = await fs.readdir(dirpath, { withFileTypes: true });
    for (const file of files) {
        if (!file.isDirectory()) {
            continue;
        }

        const subdir = path.join(dir, file.name);
        const item = await load(subdir);
        if (item) {
            items.push(item);
        }

        // 递归
        items.push(...await scan(subdir));
    }
    return items;
}

// 入口
async function main() {
    const items = await scan();
    const data = JSON.stringify(items);
    fs.writeFile('src/assets/index.json', data);
}

if (import.meta.main) {
    main()
}