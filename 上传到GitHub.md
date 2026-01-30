# 把「龙老师」项目上传到 GitHub

## 1. 在 GitHub 上新建仓库

1. 打开 [https://github.com/new](https://github.com/new)
2. **Repository name** 填：例如 `long-laoshi` 或 `ai-long-laoshi`
3. 选 **Public**，不要勾选 “Add a README file”（本地已有代码）
4. 点 **Create repository**

## 2. 在本地添加远程并推送

在终端里进入项目目录后，依次执行（把 `你的用户名` 和 `仓库名` 换成你自己的）：

```bash
cd "/Users/dengjiaxin/Library/Mobile Documents/com~apple~CloudDocs/共享/cursor/龙老师"

# 添加 GitHub 远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 提交当前未提交的修改（如有）
git add .
git commit -m "更新项目并添加 .gitignore"   # 若无新改动可跳过

# 推送到 GitHub（首次推送）
git push -u origin main
```

## 3. 若使用 SSH

如果你配置了 SSH 密钥，远程地址可以写成：

```bash
git remote add origin git@github.com:你的用户名/仓库名.git
```

## 4. 若提示需要登录

- 使用 **HTTPS** 时，GitHub 会要求身份验证，可使用 **Personal Access Token** 作为密码  
- 在 GitHub：Settings → Developer settings → Personal access tokens 里生成 token，推送时用 token 代替密码

完成以上步骤后，代码就会出现在你的 GitHub 仓库里。
