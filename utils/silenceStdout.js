function silenceStdout (flag = true) {
  if (!flag) {
    const resolver = _ => _
    resolver.writeAnyway = _ => _

    return resolver
  }

  const pile = []
  const oldWrite = process.stdout.write
  process.stdout.write = (a) => {
    pile.push(a)
  }

  const resolver = () => {
    process.stdout.write = oldWrite
    return pile
  }

  resolver.writeAnyway = (aaa) => {
    oldWrite.call(process.stdout, aaa + '\n')
  }

  return resolver
}

export default silenceStdout
