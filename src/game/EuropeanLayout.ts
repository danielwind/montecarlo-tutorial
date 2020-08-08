//--------------------------------------------------------------------//
// @author: Daniel Wind
// This data structure represents the Roulette European Layout, 
// which contains numbers:
//    0      (Green)
//    1 - 36 (Black and Red)
// HINT: Notice the pattern of color distribution, clever!
//---------------------------------------------------------------------//
import Pocket from './Pocket'
import Color from '../utils/Color'

const EuropeanLayout: Pocket[] = [
    {number: 0, color: Color.GREEN },
    {number: 1, color: Color.RED   },
    {number: 2, color: Color.BLACK },
    {number: 3, color: Color.RED   },
    {number: 4, color: Color.BLACK },
    {number: 5, color: Color.RED   },
    {number: 6, color: Color.BLACK },
    {number: 7, color: Color.RED   },
    {number: 8, color: Color.BLACK },
    {number: 9, color: Color.RED   },
    {number: 10, color: Color.BLACK },
    {number: 11, color: Color.BLACK },
    {number: 12, color: Color.RED   },
    {number: 13, color: Color.BLACK },
    {number: 14, color: Color.RED   },
    {number: 15, color: Color.BLACK },
    {number: 16, color: Color.RED   },
    {number: 17, color: Color.BLACK },
    {number: 18, color: Color.RED   },
    {number: 19, color: Color.RED   },
    {number: 20, color: Color.BLACK },
    {number: 21, color: Color.RED   },
    {number: 22, color: Color.BLACK },
    {number: 23, color: Color.RED   },
    {number: 24, color: Color.BLACK },
    {number: 25, color: Color.RED   },
    {number: 26, color: Color.BLACK },
    {number: 27, color: Color.RED   },
    {number: 28, color: Color.BLACK },
    {number: 29, color: Color.BLACK },
    {number: 30, color: Color.RED   },
    {number: 31, color: Color.BLACK },
    {number: 32, color: Color.RED   },
    {number: 33, color: Color.BLACK },
    {number: 34, color: Color.RED   },
    {number: 35, color: Color.BLACK },
    {number: 36, color: Color.RED   },
]

export default EuropeanLayout