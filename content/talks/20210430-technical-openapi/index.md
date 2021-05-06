---
title: A Technical Look at OpenAPI
subtitle:
description: Examples of how the OpenAPI specification can improve your workflow
thumbnail: https://res.cloudinary.com/mrtnvh/image/upload/v1570871092/mrtnvh.com/portrait.jpg
datePublished: 20210430
slug: a-technical-look-at-openapi
---

<section class="slide flex flex-grow-1 flex-column align-items-center justify-content-center">
	<h2 class="slide-title-main text-center">
		<div class="font-size-base line-height-base mb-ggy">A (technical) look at</div>
		<span class="outline">Open</span>API
	</h2>
	<div class="font-weight-black uppercase">by mrtnvh</div>
</section>

<section class="slide slide-centered text-center">
	<div>
		<h2 class="h1 mb-ggy">Maarten <span class="outline">Van Hoof</span></h2>
		<div class="flex align-items-center justify-content-center mb-ggy">
			<a href="https://isaac.nl">
				<img
					src="/assets/images/isaac-logo-bw.svg"
					alt="ISAAC Software Solutions from Eindhoven, The Netherlands"
					style="height: 4.5rem"
				/>
			</a>
			<small style="margin-left: 0.25rem; display: inline-block; margin-top: 0.55rem">(part of Intracto Group)</small>
		</div>
		<ul class="list-unstyled text-center">
			<li>Senior Front end Developer</li>
			<li>Open Source Advocate</li>
			<li>OpenAPI Advocate</li>
		</ul>
	</div>
</section>

<section class="slide slide-centered">
	<figure class="media w-full" style="padding-bottom: 45%">
		<img src="~/assets/images/monolith.svg" alt="Monolith application architecture" loading="lazy" />
	</figure>
</section>

<section class="slide slide-centered">
	<figure class="media w-full" style="padding-bottom: 45%">
		<img src="~/assets/images/headless.svg" alt="Headless application architecture" loading="lazy" />
	</figure>
</section>

<section class="slide slide-centered">
	<figure class="media w-full" style="padding-bottom: 45%">
		<img src="~/assets/images/clients.svg" alt="Headless application architecture with multiple clients" loading="lazy" />
	</figure>
</section>

<section class="slide slide-centered">
	<figure class="media w-full" style="padding-bottom: 45%">
		<img src="~/assets/images/code-first.svg" alt="Headless application architecture with a code-first OpenAPI document as contract" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<div class="flex flex-column flex-grow-1">
		<div class="flex-grow-1">
			<div class="flex justify-content-space-between align-items-end">
				<h2>OpenAPI</h2>
			</div>
			<p>
				The OpenAPI Specification (OAS) defines a
				<u>standard, language-agnostic interface to RESTful APIs</u> which
				allows both humans and computers to discover and understand the
				capabilities of the service without access to source code,
				documentation, or through network traffic inspection.
			</p>
			<p>
				When properly defined, a consumer can <u>understand</u> and
				<u>interact</u> with the remote service with a
				<u>minimal amount of implementation logic</u>.
			</p>
		</div>
		<small>
			<a href="https://github.com/OAI/OpenAPI-Specification/">https://github.com/OAI/OpenAPI-Specification/</a>
		</small>
	</div>
</section>

<section class="slide">
	<div class="flex justify-content-space-between align-items-end">
		<h2>OpenAPI</h2>
		<p>Document layout</p>
	</div>

```yml
openapi: # Specification version
info: # General API metadata
servers: # Server information. BaseURLs, environments, ...
paths: # Available paths & operations
components: # Datamodel abstraction
security: # Security mechanisms can be used across the API
tags: # Grouping of paths & components external
docs: # Additional external documentation
webhooks: # Webhook operations, similar to paths, only API is now a consumer.
```

</section>

<section class="slide">
	<div class="flex justify-content-space-between align-items-end">
		<h2>OpenAPI</h2>
		<p>Paths</p>
	</div>

```yml
paths:
	/pets:
		get:
			summary: List all pets
			#...
		post:
			summary: Create a pet
			#...
	/pets/{petId}:
		get:
			summary: Info for a specific pet
			#...
```

</section>

<section class="slide">
	<div class="flex justify-content-space-between align-items-end">
		<h2>OpenAPI</h2>
		<p>Operation</p>
	</div>

```yml
paths:
	/pets:
	get:
		summary: List all pets
		operationId: listPets
		tags:
		- pets
		parameters:
		- name: limit
			in: query
			description: How many items to return at one time
			required: false
			schema:
			type: integer
			format: int32
		responses:
		#...

		# description
		# requestBody
		# externalDocs
		# deprecated
		# security
		# servers
		# ...
```

</section>

<section class="slide">
	<div class="flex justify-content-space-between align-items-end">
		<h2>OpenAPI</h2>
		<p>Response</p>
	</div>

```yml
paths:
	/pets:
	get:
		#...
		responses:
		'200':
			description: Expected response to a valid request
			content:
			application/json:
				schema:
				$ref: "#/components/schemas/Pets"
		default:
			description: unexpected error
			content:
			application/json:
				schema:
				$ref: "#/components/schemas/Error"
```

</section>

<section class="slide">
	<div class="flex justify-content-space-between align-items-end">
		<h2>OpenAPI</h2>
		<p>Components</p>
	</div>

```yml
components:
	schemas:
	Pet:
	Pets:

responses:
ErrorResponse:

requestBodies:
NewPet:

headers:
Limit:
Offset:
Pagination:

#...
```

</section>

<section class="slide">
	<div class="flex justify-content-space-between align-items-end">
		<h2>OpenAPI</h2>
		<p>Component</p>
	</div>

```yml
components:
	schemas:
	Pet:
		type: object
		properties:
		id:
			type: integer
			format: int64
		name:
			type: string
			x-custom-extension: name.firstName
		image:
			type: string
		tag:
			type: string
		required:
		- id
		- name

		Pets:
			type: array
			items:
			$ref: "#/components/schemas/Pet"
```

</section>

<section class="slide">
	<h2>Code first</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/code-first.svg" alt="Headless application architecture with a code-first OpenAPI document as contract" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<h2>Code first</h2>
	<p>Generate OpenAPI document from API framework</p>
	<table class="table">
		<tbody>
			<tr>
				<th style="width: 3rem">Java</th>
				<td>springdoc-openapi</td>
			</tr>
			<tr>
				<th>.NET</th>
				<td>SwashBuckle, Nswag</td>
			</tr>
			<tr>
				<th>NodeJS:</th>
				<td>@nestjs/swagger</td>
			</tr>
		</tbody>
	</table>
</section>

<section class="slide">
	<h2>Code first</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/code-first.svg" alt="Headless application architecture with a code-first OpenAPI document as contract" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<h2>Design first</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/design-first.svg" alt="Headless application architecture with a code-first OpenAPI document as contract" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<h2>Design first</h2>
	<p>OpenAPI doc = single source of truth</p>
	<p>Entire team can be involved in developing the communication layer.</p>
	<ul>
		<li>Providers</li>
		<li>Consumers</li>
		<li>Project owner: future implementation, roadmap considerations</li>
	</ul>
</section>

<section class="slide">
	<h2>Design first</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/design-first.svg" alt="Headless application architecture with a code-first OpenAPI document as contract" loading="lazy" />
	</figure>
</section>

<section class="slide slide-centered">
	<h1>Tooling</h1>
	<p>Harness the power</p>
</section>

<section class="slide">
	<h2>Documentation</h2>
	<p>Generate entire API documentation</p>
	<p>Less technical representation</p>
	<p>Tools:</p>
	<ul>
		<li><a href="https://swagger.io/tools/swagger-ui/">Swagger UI</a></li>
		<li><a href="https://redoc.ly/redoc/">ReDoc</a></li>
	</ul>
</section>

<section class="slide">
	<h2>SDK Generation</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/sdk-one.svg" alt="Headless application architecture with a code-first OpenAPI document as contract" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<h2>SDK Generation</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/sdk-two.svg" alt="Headless application architecture with clients in multiple programming languages" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<h2>SDK Generation</h2>
	<figure style="padding-bottom: 45%" class="media w-full" style="padding-bottom: 45%">
		<img src="/assets/images/sdk-three.svg" alt="Headless application architecture with clients in multiple programming languages and a GraphQL server" loading="lazy" />
	</figure>
</section>

<section class="slide">
	<h2>SDK Generation</h2>
	<p></p>
	<ul>
		<li>
			<a href="https://openapi.tools/#sdk">openapi.tools</a><br />&nbsp;&nbsp;&nbsp;&nbsp;List of OpenAPI SDK generators
		</li>
		<li>
			<a href="https://openapi-generator.tech/">openapi-generator.tech</a><br />&nbsp;&nbsp;&nbsp;&nbsp;Java-based generator for dozens of programming languages
		</li>
		<li>
			<a href="https://github.com/ferdikoomen/openapi-typescript-codegen/">openapi-typescript-codegen</a>
		</li>
	</ul>
</section>

<section class="slide">
	<h2>Mocking</h2>
	<p>
		Turn OpenAPI files into a API servers with mocking, transformations,
		validations, ...
	</p>

```yml
# ...

paths:
/pets:
get:
operationId: listPets
responses:
"200":
content:
application/json:
schema:
type: array
items:
type: object
properties:
id:
type: integer
format: int64
name:
type: string

# ...

```

<p><a href="https://github.com/stoplightio/prism">Prism (by Stoplight)</a></p>

</section>

<section class="slide">
	<h2>Mocking</h2>
	<p>
		Turn OpenAPI files into a API servers with mocking, transformations,
		validations, ...
	</p>

```json
[
	{
		"id": 7094252654184530000,
		"name": "proident consequat anim est elit",
		"tag": "eiu"
	},
	{
		"id": 2067454767236280300,
		"name": "nostrud cupidatat nisi f",
		"tag": "sed eiusmod"
	},
	{
		"id": 5983151522463482000,
		"name": "dolore id minim magna",
		"tag": "aute consectetur do"
	}
]
```

<p><a href="https://github.com/stoplightio/prism">Prism (by Stoplight)</a></p>
</section>

<section class="slide">
	<h2>Automation</h2>
	<p>OpenAPI doc = Single Source Truth</p>
	<ul>
		<li>Instant documentation updates</li>
		<li>SDK generation at new release/commit</li>
		<li>Mocking server updates</li>
	</ul>
</section>

<section class="slide">
	<h2 class="mb-2">TIL</h2>
	<h3 class="h6">OpenAPI specification</h3>
	<ul>
		<li class="mb-0">Contract between services</li>
		<li class="mb-0">Unified way of describing a REST API</li>
	</ul>
	<ul>
		<li class="mb-0">Code first</li>
		<li class="mb-0">Design first</li>
	</ul>
	<h3 class="h6">Tools</h3>
	<ul>
		<li class="mb-0">Documentation generation</li>
		<li class="mb-0">SDK generation</li>
		<li class="mb-0">Mocking servers</li>
		<li class="mb-0">Automation</li>
	</ul>
	<h3 class="h6">Results</h3>
	<ul>
		<li class="mb-0 fragment">Single source of truth</li>
		<li class="mb-0 fragment">Enhances workflow</li>
		<li class="mb-0 fragment">Increases independence</li>
	</ul>
</section>

<section class="slide slide-centered">
	<h2 class="h1">FIN</h2>
</section>

<section class="slide slide-centered text-center">
	<h2>Find me</h2>
	<p>
		<a href="https://mrtnvh.com">mrtnvh.com</a> –
		<a href="https://mrtnvh.com">@mrtnvh</a>
	</p>
	<a href="https://isaac.nl">isaac.nl</a>
</section>

<section class="slide slide-centered">
	<img src="~/assets/images/peace.svg" alt="Peace" style="height: 6rem" />
</section>
