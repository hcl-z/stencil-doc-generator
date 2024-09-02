# {{tag}}
{{#if deprecation}}
{{deprecation}}
{{/if}}

{{#if overview}}
## Overview

{{overview}}
{{/if}}

{{#if readme}}
> {{readme}}
{{/if}}

{{#if usages.length}}
## Usage

{{#each usages}}
### {{name}}
```
{{text}}
```
{{/each}}
{{/if}}

{{#if props.length}}
## Properties

| Property | Attribute | Description | Type | Default |
| -------- | --------- | ----------- | ---- | ------- |
{{#each props}}
| {{name}}{{#if required}} _(required)_{{/if}} | {{#if attr}}`{{attr}}`{{else}}--{{/if}} | {{#if deprecation}}<span style="color:red">**[DEPRECATED]**</span> {{deprecation}}<br/><br/>{{/if}}{{docs}} | {{type}} | {{default}} |
{{/each}}
{{/if}}

{{#if events.length}}
## Events

| Event | Description | Type |
| ----- | ----------- | ---- |
{{#each events}}
| `{{event}}` |
{{#if deprecation}}
<span style="color:red">**[DEPRECATED]**</span> {{deprecation}}<br/><br/>
{{/if}}
{{docs}} | `CustomEvent<{{detail}}>` |
{{/each}}
{{/if}}

{{#if methods.length}}
## Methods

{{#each methods}}
### `{{signature}}`

{{#if deprecation}}
<span style="color:red">**[DEPRECATED]**</span> {{deprecation}}<br/><br/>
{{/if}}
{{docs}}

{{#if parameters.length}}
#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
{{#each parameters}}
| `{{name}}` | `{{type}}` | {{docs}} |
{{/each}}
{{/if}}

{{#if returns}}
#### Returns

Type: `{{returns.type}}`
{{returns.docs}}
{{/if}}

{{/each}}
{{/if}}

{{#if slots.length}}
## Slots

| Slot | Description |
| ---- | ----------- |
{{#each slots}}
| {{#if (eq name "")}}Default slot{{else}}`"{{name}}"`
{{/if}} | {{docs}} |
{{/each}}
{{/if}}

{{#if parts.length}}
## Shadow Parts

| Part | Description |
| ---- | ----------- |
{{#each parts}}
| {{#if (eq name "")}}Default part{{else}}`"{{name}}"`{{/if}} | {{docs}} |
{{/each}}
{{/if}}

{{#if styles.length}}
## CSS Custom Properties

| Name | Description |
| ---- | ----------- |
{{#each styles}}
| `{{name}}` | {{docs}} |
{{/each}}
{{/if}}
