---
title: Markdown Features Test
description: A test post to showcase various Markdown features.
date: "2024-07-29"
tags:
  - Markdown
  - Test
  - Features
imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c362ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
---

This post is a comprehensive test of all the supported Markdown features.

## Headers

# H1 Header

## H2 Header

### H3 Header

#### H4 Header

##### H5 Header

###### H6 Header

## Text Formatting

This is **bold text**. This is _italic text_. This is _**bold and italic text**_.

This is `inline code`.

This is a [link to Google](https://www.google.com).

This is a footnote[^1].

[^1]: This is the footnote content.

## Blockquotes

> This is a blockquote. It can span multiple lines.
>
>> And can be nested.

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3

### Ordered List

1. First item
2. Second item
3. Third item

### Task List

- [x] Completed task
- [ ] Incomplete task

## Code Blocks

Here's a JavaScript code block:

```javascript
function greet(name) {
	console.log(`Hello, ${name}!`);
}

greet("World");
```

And a Python one:

```python
def hello():
    print("Hello, World!")

hello()
```

## Tables

| Header 1   |   Header 2   |    Header 3 |
| :--------- | :----------: | ----------: |
| Align Left | Align Center | Align Right |
| Cell 1     |    Cell 2    |      Cell 3 |
| Cell 4     |    Cell 5    |      Cell 6 |

## Custom Containers

::: info
This is an info box.
:::

::: warning
This is a warning box.
:::

::: danger
This is a danger box.
:::

## Emoji

Here are some emojis: :tada: :rocket: :sparkles:

## Attributes

This paragraph should be red. {style="color: red;"}

- This list item should have a blue background. {style="background-color: lightblue;"}

## Horizontal Rule

---
