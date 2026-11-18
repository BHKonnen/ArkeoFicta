import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { Owlbear } from "./quartz/plugins/emitters/owlbear"

const config = await loadQuartzConfig()
config.plugins.emitters.push(Owlbear())
export default config
export const layout = await loadQuartzLayout()
