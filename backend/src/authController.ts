// Handles log in and sign up via Supabase auth

import supabase from './database'
import { Request, Response } from 'express'

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(200).json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}