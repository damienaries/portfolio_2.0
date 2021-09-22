import Image from 'next/image';
import bgImage from '../public/assets/images/bgImage.jpg';
import styled from '@emotion/styled';

const Background = () => {
    return (
        <BgWrap>
            <Image 
                alt="LA background"
                src={bgImage}
                layout="fill"
                quality={100}
                objectFit="cover"
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
    z-index: -2;
`

export default Background;
