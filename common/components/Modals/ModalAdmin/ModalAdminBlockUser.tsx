import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { SelectStatusAdmin } from 'features/admin/SelectStatusAdmin'

import { DELETE_USER, GET_USERS, UPDATE_USER_STATUS } from '../../../../assets/apollo/users'
import { ThemeButton } from '../../../enums/themeButton'
import { Button } from '../../Button/Button'
import Modal from '../ModalPublic/Modal'

type AdminBlockPropsType = {
  ban: boolean
  id: string
  isOpenModalBlock: boolean
  setIsOpenModalBlock: (isOpenModalBlock: boolean) => void
  userName: string
}

export const ModalAdminBlockUser = ({
  ban,
  isOpenModalBlock,
  setIsOpenModalBlock,
  id,
  userName,
}: AdminBlockPropsType) => {
  const [blockUser] = useMutation(UPDATE_USER_STATUS, {
    variables: {
      userId: id,
      banStatus: !ban,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const onClose = () => {
    setIsOpenModalBlock(false)
  }
  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => {
    setHovered(false)
  }

  const handleMouseLeave = () => {
    setHovered(true)
  }

  const handleBlock = () => {
    blockUser().then(() => setIsOpenModalBlock(false))
  }

  return isOpenModalBlock ? (
    <Modal
      bodyText={`Are you sure to ban this user, ${userName}?`}
      handleModalClose={onClose}
      title="Block user"
      width="440px"
    >
      <>
        <SelectStatusAdmin
          initialValue="Reason for ban"
          options={['Bad behavior', 'Advertising placement', 'Another reason']}
        />
        <>
          <Button
            theme={hovered ? ThemeButton.PRIMARY : ThemeButton.OUTLINED}
            width="96px"
            onClick={onClose}
            onMouseEnter={handleMouseLeave}
            onMouseLeave={handleMouseEnter}
          >
            No
          </Button>
          <Button
            theme={hovered ? ThemeButton.OUTLINED : ThemeButton.PRIMARY}
            width="96px"
            onClick={() => handleBlock()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Yes
          </Button>
        </>
      </>
    </Modal>
  ) : null
}
