import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

export async function runTheraMuse(payload: Record<string, unknown>) {
  const scriptPath = path.join(process.cwd(), 'scripts', 'theramuse_cli.py')
  const pythonBinary = resolvePythonBinary()

  return new Promise<any>((resolve, reject) => {
    const child = spawn(pythonBinary, [scriptPath], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PYTHONUNBUFFERED: '1',
      },
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString()
    })

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('close', (code) => {
      if (stderr.trim()) {
        console.error('[TheraMuse stderr]', stderr)
      }
      if (code !== 0) {
        reject(new Error(stderr || `TheraMuse exited with code ${code}`))
        return
      }
      try {
        const parsed = JSON.parse(stdout.trim())
        if (parsed?.error) {
          reject(new Error(parsed.error))
        } else {
          resolve(parsed)
        }
      } catch (error) {
        reject(new Error(`Unable to parse TheraMuse response: ${stdout}`))
      }
    })

    child.on('error', (error) => {
      reject(error)
    })

    child.stdin.write(JSON.stringify(payload))
    child.stdin.end()
  })
}

function resolvePythonBinary() {
  const fromEnv = process.env.THERAMUSE_PYTHON_BINARY
  if (fromEnv) {
    return fromEnv
  }

  const candidates = [
    path.join(process.cwd(), 'venv', 'bin', 'python'),
    path.join(process.cwd(), 'venv', 'Scripts', 'python.exe'),
    path.join(process.cwd(), 'theramusenv', 'bin', 'python'),
    path.join(process.cwd(), 'theramusenv', 'Scripts', 'python.exe'),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return 'python3'
}
