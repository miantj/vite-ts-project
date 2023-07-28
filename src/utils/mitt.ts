import type { Emitter } from 'mitt'
import mitt from 'mitt'

type Events = {
    mittHandleMessage: any;
    mittCountA?: number;
    mittCountB?: number;
}

export const emitter: Emitter<Events> = mitt<Events>()
