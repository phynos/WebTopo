
import jsonData from '@/assets/data/topo-data.json';

export const loadDefaultTopoData = (ctx) => {
    ctx.state.topoData = jsonData;
}