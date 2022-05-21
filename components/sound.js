import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { useState, useEffect } from 'react';

const SoundBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  img {
    transition: 200ms ease;
  }

//   &:hover img {
//     transform: rotate(20deg);
//   }
`

const Sound = () => {
    // const footPrintImg = `/images/footprint${useColorModeValue('', '-dark')}.png`
    const baseUrl = `/images/sound_${useColorModeValue('light', 'dark')}mode/`;

    const [soundStat, setSoundStat] = useState(false);
    const [soundImg, setSoundImg] = useState(`/images/sound_${useColorModeValue('light', 'dark')}mode/off.png`);

    useEffect(() => {
        if (soundStat) {
            setSoundImg(baseUrl+'off.png');
        } else {
            setSoundImg(baseUrl+'on.png');
        }
    }, [baseUrl])

    const onClickSound = () => {
        const stat = !soundStat;
        setSoundStat(stat);

        if (stat) {
            setSoundImg(baseUrl+'off.png');
        } else {
            setSoundImg(baseUrl+'on.png');
        }
    }

    return (
        <SoundBox onClick={onClickSound}>
            <Image src={soundImg} width={45} height={35} alt="sound" />
        </SoundBox>
    )
}

export default Sound
