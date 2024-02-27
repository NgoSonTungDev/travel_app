class MixinBuilder<T> {
  superclass: T
  constructor(superclass: T) {
    this.superclass = superclass
  }

  with(...mixins: any[]): T {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass)
  }
}

const mix = <T>(superclass: T) => new MixinBuilder(superclass)

export default mix
