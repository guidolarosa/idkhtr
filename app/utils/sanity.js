// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = 'ns126j8b';
const dataset = 'production';

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source)
}

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]')
  return posts
}

export async function createPost(post) {
  const result = client.create(post)
  return result
}

export async function updateDocumentTitle(_id, title) {
  const result = client.patch(_id).set({title})
  return result
}

export function getSanityImage(_ref) {
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${_ref}`
}