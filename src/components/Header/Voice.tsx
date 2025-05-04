import { Mic, MicOff } from 'lucide-react';
import { useState } from 'react';

export default function Voice() {
  const [active, setActive] = useState(false);
  return (
    <>
      {active
        ? <Mic
          className="text-green-200 cursor-pointer"
          size={18}
          onClick={() => setActive(!active)}
        />
        : <MicOff
          className="text-green-200 cursor-pointer"
          size={18}
          onClick={() => setActive(!active)}
        />
      }
    </>
  )
}
