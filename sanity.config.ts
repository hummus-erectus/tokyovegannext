import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './src/sanity/schemas'
import { dataset, projectId } from './src/sanity/env'

export default defineConfig({
  name: 'tokyo-vegan',
  title: 'Tokyo Vegan Blog',

  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'ja', title: '日本語' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: ['post'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
