---
layout: default.njk
title: Style guide
description: Kitchen sink of elements for design purposes
---

This is a test page filled with common HTML elements to be used to provide visual feedback whilst building CSS systems and frameworks.

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

# Paragraphs

A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.

# Blockquotes

> A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.
>
> It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.
>
> <cite>[Said no one, ever.](#!)</cite>

# Lists

### Definition list

<dl>

<dt>Definition List Title</dt>

<dd>This is a definition list division.</dd>

</dl>

### Ordered List

1.  List Item 1
2.  List Item 2
3.  List Item 3

### Unordered List

- List Item 1
- List Item 2
- List Item 3

# Horizontal rules

# Tabular data

<table>
   <caption>Table Caption</caption>
   <thead>
      <tr>
         <th>Table Heading 1</th>
         <th>Table Heading 2</th>
         <th>Table Heading 3</th>
         <th>Table Heading 4</th>
         <th>Table Heading 5</th>
      </tr>
   </thead>
   <tfoot>
      <tr>
         <th>Table Footer 1</th>
         <th>Table Footer 2</th>
         <th>Table Footer 3</th>
         <th>Table Footer 4</th>
         <th>Table Footer 5</th>
      </tr>
   </tfoot>
   <tbody>
      <tr>
         <td>Table Cell 1</td>
         <td>Table Cell 2</td>
         <td>Table Cell 3</td>
         <td>Table Cell 4</td>
         <td>Table Cell 5</td>
      </tr>
      <tr>
         <td>Table Cell 1</td>
         <td>Table Cell 2</td>
         <td>Table Cell 3</td>
         <td>Table Cell 4</td>
         <td>Table Cell 5</td>
      </tr>
      <tr>
         <td>Table Cell 1</td>
         <td>Table Cell 2</td>
         <td>Table Cell 3</td>
         <td>Table Cell 4</td>
         <td>Table Cell 5</td>
      </tr>
      <tr>
         <td>Table Cell 1</td>
         <td>Table Cell 2</td>
         <td>Table Cell 3</td>
         <td>Table Cell 4</td>
         <td>Table Cell 5</td>
      </tr>
   </tbody>
</table>

# Code

```javascript
function whereTo() {
  const foo = "bar";
  for (let i = 0; i < 10; i++) {
    console.log(foo);
  }
}

whereTo();
```

**Keyboard input:** <kbd>Cmd</kbd>

**Inline code:** `<div>code</div>`

**Sample output:** <samp>This is sample output from a computer program.</samp>

## Pre-formatted text

<pre>P R E F O R M A T T E D T E X T
  ! " # $ % & ' ( ) * + , - . /
  0 1 2 3 4 5 6 7 8 9 : ; < = > ?
  @ A B C D E F G H I J K L M N O
  P Q R S T U V W X Y Z [ \ ] ^ _
  ` a b c d e f g h i j k l m n o
  p q r s t u v w x y z { | } ~ </pre>

# Inline elements

[This is a text link](#!).

**Strong is used to indicate strong importance.**

_This text has added emphasis._

The **b element** is stylistically different text from normal text, without any special importance.

The _i element_ is text that is offset from the normal text.

The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.

<del>This text is deleted</del> and <ins>This text is inserted</ins>.

<s>This text has a strikethrough</s>.

Superscript<sup>®</sup>.

Subscript for things like H<sub>2</sub>O.

<small>This small text is small for for fine print, etc.</small>

Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>

<q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q>

<cite>This is a citation.</cite>

The <dfn>dfn element</dfn> indicates a definition.

The <mark>mark element</mark> indicates a highlight.

The <var>variable element</var>, such as <var>x</var> = <var>y</var>.

The time element: <time datetime="2013-04-06T12:32+00:00">2 weeks ago</time>

# Embedded content

## Images

### No `<figure>` element

![Image alt text](http://placekitten.com/480/480)

### Wrapped in a `<figure>` element, no `<figcaption>`

<figure>![Image alt text](http://placekitten.com/420/420)</figure>

### Wrapped in a `<figure>` element, with a `<figcaption>`

<figure>![Image alt text](http://placekitten.com/420/420)

<figcaption>Here is a caption for this image.</figcaption>

</figure>

## Progress

<div><progress>progress</progress></div>

## Inline SVG

## IFrame

<iframe src="index.html" height="300"></iframe>

# Form elements

<fieldset id="forms__input">
  <legend>Input fields</legend>
  <label for="input__text">Text Input</label> <input id="input__text" type="text" placeholder="Text Input">
  <label for="input__password">Password</label> <input id="input__password" type="password" placeholder="Type your Password">
  <label for="input__webaddress">Web Address</label> <input id="input__webaddress" type="url" placeholder="http://yoursite.com">
  <label for="input__emailaddress">Email Address</label> <input id="input__emailaddress" type="email" placeholder="name@email.com">
  <label for="input__phone">Phone Number</label> <input id="input__phone" type="tel" placeholder="(999) 999-9999">
  <label for="input__search">Search</label> <input id="input__search" type="search" placeholder="Enter Search Term">
  <label for="input__text2">Number Input</label> <input id="input__text2" type="number" placeholder="Enter a Number">
  <label for="input__text3" class="error">Error</label> <input id="input__text3" class="is-error" type="text" placeholder="Text Input">
  <label for="input__text4" class="valid">Valid</label> <input id="input__text4" class="is-valid" type="text" placeholder="Text Input">
</fieldset>
<fieldset id="forms__select">
  <legend>Select menus</legend>
  <label for="select">Select</label> 
  <select id="select">
    <optgroup label="Option Group">
      <option>Option One</option>
      <option>Option Two</option>
      <option>Option Three</option>
    </optgroup>
  </select>
</fieldset>
<fieldset id="forms__checkbox">
  <legend>Checkboxes</legend>
  *   <label for="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked="checked"> Choice A</label>
  *   <label for="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox"> Choice B</label>
  *   <label for="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox"> Choice C</label>
</fieldset>
<fieldset id="forms__radio">
  <legend>Radio buttons</legend>
  *   <label for="radio1"><input id="radio1" name="radio" type="radio" class="radio" checked="checked"> Option 1</label>
  *   <label for="radio2"><input id="radio2" name="radio" type="radio" class="radio"> Option 2</label>
  *   <label for="radio3"><input id="radio3" name="radio" type="radio" class="radio"> Option 3</label>
</fieldset>
<fieldset id="forms__textareas">
  <legend>Textareas</legend>
  <label for="textarea">Textarea</label>
  <textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here"></textarea>
</fieldset>
<fieldset id="forms__html5">
  <legend>HTML5 inputs</legend>
  <label for="ic">Color input</label> <input type="color" id="ic" value="#000000">
  <label for="in">Number input</label> <input type="number" id="in" min="0" max="10" value="5">
  <label for="ir">Range input</label> <input type="range" id="ir" value="10">
  <label for="idd">Date input</label> <input type="date" id="idd" value="1970-01-01">
  <label for="idm">Month input</label> <input type="month" id="idm" value="1970-01">
  <label for="idw">Week input</label> <input type="week" id="idw" value="1970-W01">
  <label for="idt">Datetime input</label> <input type="datetime" id="idt" value="1970-01-01T00:00:00Z">
  <label for="idtl">Datetime-local input</label> <input type="datetime-local" id="idtl" value="1970-01-01T00:00">

# Buttons

<a class="button" href="#">Default Button</a>
<button class="button button-outline">Outlined Button</button>
<input class="button button-clear" type="submit" value="Clear Button">

## Input button variations

<input type="submit" value="<input type=submit>">
<input type="button" value="<input type=button>">

<input type="reset" value="<input type=reset>">
<input type="submit" value="<input disabled>" disabled="">
