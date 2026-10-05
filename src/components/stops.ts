// Each section is a stop on the dive, named after the brain region it sits in.
export const stops = [
  { id: 'top', label: 'Surface', region: 'Skull' },
  { id: 'about', label: 'About', region: 'Cortex' },
  { id: 'research', label: 'Research', region: 'Hippocampus' },
  { id: 'projects', label: 'Projects', region: 'Basal ganglia' },
  { id: 'experience', label: 'Experience', region: 'Corpus callosum' },
  { id: 'skills', label: 'Skills', region: 'Thalamus' },
  { id: 'latest', label: 'Latest', region: 'Brainstem' },
  { id: 'contact', label: 'Contact', region: 'Synapse' },
]

export const statusTone: Record<string, string> = {
  published: 'text-spike border-spike/40',
  completed: 'text-axon border-axon/40',
  ongoing: 'text-calcium border-calcium/40',
  active: 'text-calcium border-calcium/40',
  shipped: 'text-spike border-spike/40',
  prototype: 'text-muted border-line',
}
