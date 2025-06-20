'use client'

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../../_components/PageHeader'
import type { SlideWithAnimations } from '../index'

type DetailView = 'tools' | 'resources' | 'sampling' | null

const McpCapabilities = forwardRef<SlideWithAnimations>((props, ref) => {
  const [stage, setStage] = useState(1)
  const [detailView, setDetailView] = useState<DetailView>(null)

  const slideVariants = {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    initial: { opacity: 0, y: 50 },
  }

  // Expose animation interface
  useImperativeHandle(ref, () => ({
    advanceAnimation: () => {
      if (stage < 3 && !detailView) {
        setStage(prev => prev + 1)
      }
    },
    canAdvanceAnimation: () => stage < 3 && !detailView,
  }))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' && !detailView) {
        setStage(prev => Math.min(prev + 1, 3))
      }
      if (event.key === 'ArrowUp' && !detailView) {
        setStage(prev => Math.max(prev - 1, 1))
      }
      if (event.key === 'Escape') {
        setDetailView(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [detailView])

  const renderDetailContent = () => {
    if (!detailView) return null

    const detailContent = {
      resources: (
        <div className="space-y-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setDetailView(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>
          </div>
          
          {/* Resources Section */}
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">📦 Resources</h3>
            <p className="text-xl text-gray-700 mb-6">Resources are read-only assets, like logs, images, DB records, that the server makes available for inclusion in context. Can be dynamic by using query params.</p>
            <div className="mb-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-lg text-gray-700"><strong>Identification:</strong> Resources are identified via <code className="bg-gray-200 px-2 py-1 rounded text-base">[protocol]://[host]/[path]</code></p>
              <p className="text-lg text-gray-700 mt-2"><strong>Content:</strong> Contents can be UTF-8 or binary</p>
              <p className="text-lg text-gray-700 mt-2"><strong>Notifications:</strong> MCP has a notification mechanism where server can pre-emptively notify client that resource has changed</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg text-lg font-mono overflow-x-auto">
              <div className="text-gray-300">
                <div className="text-blue-400">{'{'}</div>
                <div className="ml-2">
                  <span className="text-red-400">uri</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-11">// Unique identifier for the resource</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">name</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-10">// Human-readable name</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">description</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-2">// Optional description</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">mimeType</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-4">// Optional MIME type</span>
                </div>
                <div className="text-blue-400">{'}'}</div>
              </div>
            </div>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Implementation Notes</h4>
              <p className="text-gray-600 text-lg">People are confused how this works with RAG and also isn't just a regular GET call.</p>
            </div>
          </div>

          {/* Prompts Section */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">💬 Prompts</h3>
            <p className="text-xl text-gray-700 mb-6">The server provides ready-to-go prompts for use in the client's LLM calls. Meant to be user-controlled. Like a prompt for summarization may be exposed in a context menu.</p>
            <div className="bg-gray-900 p-6 rounded-lg text-lg font-mono overflow-x-auto">
              <div className="text-gray-300">
                <div className="text-blue-400">{'{'}</div>
                <div className="ml-2">
                  <span className="text-red-400">name</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-14">// Unique identifier for the prompt</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">description</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-6">// Human-readable description</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">arguments</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-blue-400">[</span><span className="text-gray-500 ml-8">// Optional list of arguments</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">{'{'}</span>
                </div>
                <div className="ml-6">
                  <span className="text-red-400">name</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-10">// Argument identifier</span>
                </div>
                <div className="ml-6">
                  <span className="text-red-400">description</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-2">// Argument description</span>
                </div>
                <div className="ml-6">
                  <span className="text-red-400">required</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">boolean</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-4">// Whether argument is required</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">{'}'}</span>
                </div>
                <div className="ml-2">
                  <span className="text-blue-400">]</span>
                </div>
                <div className="text-blue-400">{'}'}</div>
              </div>
            </div>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Implementation Notes</h4>
              <p className="text-gray-600 text-lg">This is so far such a narrow use case that people haven't done much with it yet.</p>
            </div>
          </div>
        </div>
      ),
      sampling: (
        <div className="space-y-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setDetailView(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>
          </div>
          
          {/* Sampling Section */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">🔬 Sampling</h3>
            <p className="text-xl text-gray-700 mb-6">Sampling is literally the MCP server requesting the MCP Client make an LLM call.</p>
            <div className="bg-gray-900 p-6 rounded-lg text-lg font-mono overflow-x-auto">
              <div className="text-gray-300">
                <div className="text-blue-400">{'{'}</div>
                <div className="ml-2">
                  <span className="text-red-400">messages</span><span className="text-gray-300">: </span><span className="text-blue-400">[</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">{'{'}</span>
                </div>
                <div className="ml-6">
                  <span className="text-red-400">role</span><span className="text-gray-300">: </span><span className="text-green-400">"user"</span><span className="text-gray-300"> | </span><span className="text-green-400">"assistant"</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-6">
                  <span className="text-red-400">content</span><span className="text-gray-300">: </span><span className="text-blue-400">{'{'}</span>
                </div>
                <div className="ml-8">
                  <span className="text-red-400">type</span><span className="text-gray-300">: </span><span className="text-green-400">"text"</span><span className="text-gray-300"> | </span><span className="text-green-400">"image"</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-8 mt-2">
                  <span className="text-gray-500">// For text:</span>
                </div>
                <div className="ml-8">
                  <span className="text-red-400">text</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-8 mt-2">
                  <span className="text-gray-500">// For images:</span>
                </div>
                <div className="ml-8">
                  <span className="text-red-400">data</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">,</span><span className="text-gray-500 ml-13">// base64 encoded</span>
                </div>
                <div className="ml-8">
                  <span className="text-red-400">mimeType</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-400">{'}'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">{'}'}</span>
                </div>
                <div className="ml-2">
                  <span className="text-blue-400">]</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">modelPreferences</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-blue-400">{'{'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">hints</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-blue-400">[{'{'}</span>
                </div>
                <div className="ml-6">
                  <span className="text-red-400">name</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500 ml-16">// Suggested model name/family</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">{'}'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">costPriority</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">number</span><span className="text-gray-500">,</span><span className="text-gray-500 ml-9">// 0-1, importance of minimizing cost</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">speedPriority</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">number</span><span className="text-gray-500">,</span><span className="text-gray-500 ml-8">// 0-1, importance of low latency</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">intelligencePriority</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">number</span><span className="text-gray-500 ml-2">// 0-1, importance of capabilities</span>
                </div>
                <div className="ml-2">
                  <span className="text-blue-400">{'}'}</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">systemPrompt</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">includeContext</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">"none"</span><span className="text-gray-300"> | </span><span className="text-green-400">"thisServer"</span><span className="text-gray-300"> | </span><span className="text-green-400">"allServers"</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">temperature</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">number</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">maxTokens</span><span className="text-gray-300">: </span><span className="text-green-400">number</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">stopSequences</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string[]</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">metadata</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">object</span>
                </div>
                <div className="text-blue-400">{'}'}</div>
              </div>
            </div>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Implementation Notes</h4>
              <p className="text-gray-600 text-lg">Very few people are using this. Claude Desktop doesn't even support it. Human is still supposed to be in the loop. This is really meant to enable agents. One MCP server can orchestrate the client does LLM calls back and forth.</p>
            </div>
          </div>

          {/* Orchestration Section */}
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">🔗 Orchestration</h3>
            <p className="text-xl text-gray-700 mb-6">MCP Registry concept where Anthropic aims for the MCP client to not have to know anything about a server manually. Basically, it eventually has a registry and just looks up tools it needs on the fly.</p>
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-lg text-gray-700"><strong>Startups building this:</strong> Smithery, Mintlify, and PulseMCP</p>
              <p className="text-lg text-gray-700 mt-2"><strong>Challenges:</strong> Lots to figure out in terms of authentication, billing, permissions, etc.</p>
            </div>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Implementation Notes</h4>
              <p className="text-gray-600 text-lg">Cutting-edge features with limited client support. Future patterns for complex AI workflows are still being discovered.</p>
            </div>
          </div>
        </div>
      ),
      tools: (
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setDetailView(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Tools are things that make changes to the world described in natural language</h3>
            <div className="bg-gray-900 p-6 rounded-lg text-lg font-mono overflow-x-auto">
              <div className="text-gray-300">
                <div className="text-blue-400">{'{'}</div>
                <div className="ml-2">
                  <span className="text-red-400">name</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-4">// Unique identifier for the tool</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">description</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-2">// Human-readable description</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">inputSchema</span><span className="text-gray-300">: </span><span className="text-blue-400">{'{'}</span><span className="text-gray-500 ml-8">// JSON Schema for the tool's parameters</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">type</span><span className="text-gray-300">: </span><span className="text-green-400">"object"</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">properties</span><span className="text-gray-300">: </span><span className="text-blue-400">{'{ ... }'}</span><span className="text-gray-500 ml-2">// Tool-specific parameters</span>
                </div>
                <div className="ml-2">
                  <span className="text-blue-400">{'}'}</span><span className="text-gray-500">,</span>
                </div>
                <div className="ml-2">
                  <span className="text-red-400">annotations</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-blue-400">{'{'}</span><span className="text-gray-500 ml-4">// Optional hints about tool behavior</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">title</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">string</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-8">// Human-readable title for the tool</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">readOnlyHint</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">boolean</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-4">// If true, the tool does not modify its environment</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">destructiveHint</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">boolean</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-1">// If true, the tool may perform destructive updates</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">idempotentHint</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">boolean</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-2">// If true, repeated calls with same args have no additional effect</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">openWorldHint</span><span className="text-yellow-400">?</span><span className="text-gray-300">: </span><span className="text-green-400">boolean</span><span className="text-gray-500">;</span><span className="text-gray-500 ml-3">// If true, tool interacts with external entities</span>
                </div>
                <div className="ml-2">
                  <span className="text-blue-400">{'}'}</span>
                </div>
                <div className="text-blue-400">{'}'}</div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Implementation Notes</h4>
            <p className="text-gray-600 text-lg">MCP servers never talk directly to the LLM. The MCP client controls the LLM and decides which tools to expose or call - it can hide tools from the LLM or execute them independently.</p>
          </div>
        </div>
      ),
    }

    return detailContent[detailView]
  }

  return (
    <div className="min-h-screen p-6 flex flex-col max-w-7xl mx-auto w-full pt-12">
      <PageHeader title="MCP Capabilities" />

      <div className="flex-1 relative overflow-hidden mt-16">
        {/* Main Content Area */}
        <motion.div 
          className="w-full flex flex-col"
          animate={{ x: detailView ? '-100%' : 0 }}
          transition={{ 
            delay: detailView ? 0 : 0.5,
            duration: 0.5, 
            ease: 'easeInOut',
          }}
        >
          {/* Level 1 - Core */}
          <div className="mb-12 flex-1">
            <div 
              className="border-l-8 border-l-emerald-500 border-b border-t border-[#A9A9A9] px-12 py-4 transition-colors duration-200 cursor-pointer rounded-l-xl group"
              onClick={() => setDetailView('tools')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-12">
                  <div className="text-7xl w-32">🛠️</div>
                  <div>
                    <div className="flex items-center space-x-6 mb-3">
                      <span className="bg-emerald-500 text-white px-6 py-2 rounded-full text-lg font-medium">LEVEL 1</span>
                      <span className="text-gray-500 text-lg font-medium">ESSENTIAL</span>
                    </div>
                    <h2 className="text-5xl font-semibold text-gray-900 mb-2">Tools</h2>
                    <p className="text-gray-600 text-xl">Universal support • Core functionality • Can't live without it</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <div className="text-gray-500 text-lg mb-3">Support Level</div>
                    <div className="flex space-x-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-emerald-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="p-2 text-gray-400 group-hover:text-emerald-500 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 2 - Intermediate */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div 
                key='level-2'
                className="mb-12 flex-1"
                variants={slideVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div 
                  className="border-l-8 border-l-amber-500 border-b border-t border-[#A9A9A9] px-12 py-4 transition-colors duration-200 cursor-pointer rounded-l-xl group"
                  onClick={() => setDetailView('resources')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                      <div className="w-32 flex space-x-4">
                        <span className="text-6xl">📦</span>
                        <span className="text-6xl">💬</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-6 mb-3">
                          <span className="bg-amber-500 text-white px-6 py-2 rounded-full text-lg font-medium">LEVEL 2</span>
                          <span className="text-gray-500 text-lg font-medium">EVOLVING</span>
                        </div>
                        <h2 className="text-5xl font-semibold text-gray-900 mb-2">Resources & Prompts</h2>
                        <p className="text-gray-600 text-xl">Growing support • Active debate • Patterns emerging</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <div className="text-gray-500 text-lg mb-3">Support Level</div>
                        <div className="flex space-x-3">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-5 h-5 bg-amber-500 rounded-full"></div>
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <div key={i + 3} className="w-5 h-5 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 text-gray-400 group-hover:text-amber-500 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Level 3 - Advanced */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div 
                key='level-3'
                className="flex-1"
                variants={slideVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div 
                  className="border-l-8 border-l-purple-500 border-b border-t border-[#A9A9A9] px-12 py-4 transition-colors duration-200 cursor-pointer rounded-l-xl group"
                  onClick={() => setDetailView('sampling')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                      <div className="w-32 flex space-x-4">
                        <span className="text-6xl">🔬</span>
                        <span className="text-6xl">🔗</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-6 mb-3">
                          <span className="bg-purple-500 text-white px-6 py-2 rounded-full text-lg font-medium">LEVEL 3</span>
                          <span className="text-gray-500 text-lg font-medium">EXPERIMENTAL</span>
                        </div>
                        <h2 className="text-5xl font-semibold text-gray-900 mb-2">Sampling & Orchestration</h2>
                        <p className="text-gray-600 text-xl">Limited support • Cutting edge • Future potential</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <div className="text-gray-500 text-lg mb-3">Support Level</div>
                        <div className="flex space-x-3">
                          <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                          {[...Array(4)].map((_, i) => (
                            <div key={i + 1} className="w-5 h-5 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 text-gray-400 group-hover:text-purple-500 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Detail Panel */}
        <AnimatePresence>
          {detailView && (
            <motion.div
              key={detailView}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 p-8 overflow-y-auto z-10"
            >
              {renderDetailContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})

export default McpCapabilities
