import { 
  Box, 
  Link 
} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Degen Hounds. All Rights Reserved. Special thanks to {" "}
            <Link href="https://webchain.sellix.io/" target="_blank">
              Webchain Development!
        </Link>
            {" "}
    </Box>
  )
}

export default Footer
