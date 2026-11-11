import { localRepository } from './localRepository'
import { supabaseRepository } from './supabaseRepository'
import { supabaseConfigurado } from './supabaseClient'
import type { Repository } from './repository'

export const modoNube = supabaseConfigurado
export const repositorio: Repository = supabaseConfigurado ? supabaseRepository : localRepository
