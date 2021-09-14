import Image from 'next/image';
import bgImage from '../public/assets/images/Landing.jpg';
import styled from '@emotion/styled';

const Background = () => {
    return (
        <>
            <BgWrap>
                <Image 
                    alt="LA background"
                    src={bgImage}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </BgWrap>
        </>
    )
}

const BgWrap = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: -1;
`

export default Background;
