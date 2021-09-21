import Image from 'next/image';
import bgImage from '../public/assets/images/Landing.jpg';
import styled from '@emotion/styled';

const Background = () => {
    return (
        <BgWrap>
            <Image 
                alt="LA background"
                src={bgImage}
                layout="fill"
                quality={75}
                placeholder="blur"
            />
        </BgWrap>
    )
}

const BgWrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
`

export default Background;
