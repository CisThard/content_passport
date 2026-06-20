<!-- Source: https://docs.sui.io/references/contribute/contribution-process -->

* [](</>)
  * Contribute


On this page

# Contribute to Sui Documentation

The Sui documentation is open source and thrives on community contributions. Whether you’re fixing a typo, clarifying explanations, or adding entirely new content, your work benefits the whole community. This page explains how to contribute to the documentation using either GitHub’s web editor or your local development environment.

## Follow the style guide​

All documentation changes must follow the [Sui style guide](</references/contribute/style-guide>). Reviewers will provide feedback to ensure consistency in tone and quality. Don’t be discouraged if your pull request (PR) receives multiple review comments, as this process helps maintain clarity and uniformity across all docs. After your PR is merged, future updates might refine your content further.

When writing, keep these key principles in mind:

  * Use active voice.
  * Write in present tense.
  * Be clear and concise. Use only as many words as needed.


## GitHub web editor​

If you’re new to Git or prefer a simpler workflow, you can make small edits directly in GitHub’s web interface.

  * **Add a new page**

    1. Go to the `docs/content` directory.
    2. Open the relevant subdirectory.
    3. Click **Add file** → **Create new file**.
    4. Write your content and commit your changes.
  * **Edit an existing page**

    1. From the documentation website, you can use the Edit this page link at the bottom of each documentation page.
    2. From GitHub, navigate to the file you want to update. Click the **pencil icon** in the top-right.
    3. Make your edits and commit them.


## Set up a local environment​

Cloning the documentation locally is recommended when you are creating larger, more significant changes to the docs. See [Sui Environment Setup](</references/contribute/sui-environment>) for instructions on forking and cloning the Sui repository. Documentation is located in the `docs/content` directory.

  1. **Install dependencies**
     * If you use [Visual Studio Code](<https://code.visualstudio.com/>), install the [Prettier extension](<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>) to keep formatting consistent.
  2. **Make your changes**
     * Edit or add files in the `docs/content` directory.
     * Stage and commit changes:
[code] git add .  
           git commit -m "Describe your changes"  
           git push  
           
[/code]

  3. **Preview locally**
     * Navigate to the `docs/site` directory.
     * Install dependencies (If you don’t have `pnpm` installed, see the [pnpm installation guide](<https://pnpm.io/installation>)):
[code] pnpm install  
           
[/code]

     * Start the local dev server:
[code] pnpm start  
           
[/code]

     * Open `http://localhost:3000` to verify your updates.


## Review process​

When your changes are ready:

  1. Submit a PR to the `main` branch of the Sui repository.
  2. A [Vercel](<https://vercel.com>) preview will be generated so you can verify your changes. The preview is what you can expect to see online after your changes have been merged.
  3. Reviewers will provide feedback. It’s your responsibility to update your PR based on their comments. Multiple reviewers might give input.
  4. After at least one reviewer approves your PR, it gets merged into `main`, and your contribution goes live. Changes are reflected on the live website within 5-10 minutes after the PR has merged into `main`.


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/contribute/contribution-process.mdx>)

[NextSui Environment Setup](</references/contribute/sui-environment>)

  * Follow the style guide
  * GitHub web editor
  * Set up a local environment
  * Review process
