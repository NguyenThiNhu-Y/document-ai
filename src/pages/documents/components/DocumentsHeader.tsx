import { useUploadDocument } from '@/api/documentAPI/documentAPI.hooks'
import Line from '@/components/Line'
import { Heading, Flex, Button, Text, TextField } from '@radix-ui/themes'
import { ChangeEvent, DragEventHandler, useState } from 'react'
import { IoCloudUpload } from 'react-icons/io5'
import { FaTimes } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'
import { HiOutlineArrowUp } from 'react-icons/hi'
import { createPortal } from 'react-dom'
import { FaRegFileLines, FaTruckPlane } from 'react-icons/fa6'
import DialogChooseFile from '@/components/Dialog/DailogChooseFile'
import { toast } from 'react-hot-toast'
import Loading from '@/pages/loading/Loading'

type DocumentsHeaderType = {
  searchKeyword?: string
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>
  handleSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
const DocumentsHeader: React.FC<DocumentsHeaderType> = ({ searchKeyword, handleSearchChange }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useUploadDocument()

  const handleRemoveFile = (file: File) => {
    const updatedFiles = selectedFile.filter((item) => item.name !== file.name)
    setSelectedFile(updatedFiles)
  }
  const handleSubmit = () => {
    if (selectedFile.length > 0) {
      setIsLoading(FaTruckPlane)
      const formData = new FormData()
      for (const file of selectedFile) {
        formData.append('files', file)
      }
      const idUser = localStorage.getItem('DOCUMENT_AI_USER')
      if (idUser) {
        mutate(
          { files: formData, idUser: +idUser },
          {
            onSuccess: (data) => {
              console.log('data ----> ', data)
              setIsLoading(false)
              setIsShowDialog(false)
              setSelectedFile([])
            },
          }
        )
      }
    } else {
      toast.error('Please choose file')
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(Array.from(event.target.files))
    }
  }
  const handleFileDrop: DragEventHandler<HTMLInputElement> = () => {
    // if (event.target.files) {
    //   setSelectedFile(Array.from(event.target.files))
    // }
  }

  return (
    <>
      {isLoading && createPortal(<Loading />, document.body)}
      <Flex pb={'5'} align={'baseline'}>
        <Heading size='3'>QUẢN LÝ TÀI LIỆU</Heading>
        <Flex ml={'auto'} gap={'5'} align={'center'}>
          <TextField.Root size={'2'}>
            <TextField.Slot>
              <CiSearch size={20} />
            </TextField.Slot>
            <TextField.Input
              placeholder='Tìm tài liệu'
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </TextField.Root>
          <Button onClick={() => setIsShowDialog(true)}>
            <Text mr={'2'}>Tải lên</Text> <HiOutlineArrowUp size={16} />
          </Button>
        </Flex>
        {isShowDialog &&
          createPortal(
            <DialogChooseFile setIsShowDialog={setIsShowDialog} className=''>
              <div className='flex justify-end mb-2'>
                <button className=' p-1' onClick={() => setIsShowDialog(false)}>
                  <RxCross2 fontSize={16} />
                </button>
              </div>
              <div className='w-full'>
                <div className='py-10 border rounded-sm'>
                  {selectedFile.length > 0 ? (
                    <>
                      {selectedFile.map((file, index) => {
                        return (
                          <div
                            key={index}
                            className='flex relative font-semibold gap-2 items-center p-2 mx-2 mb-1 border rounded-sm'
                          >
                            <FaRegFileLines fontSize={16} />
                            <span>{file.name}</span>
                            <button
                              className='absolute right-2 top-[50%] p-1 hover:bg-red-200'
                              style={{ transform: 'translateY(-50%)' }}
                              onClick={() => handleRemoveFile(file)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      <label htmlFor='chooseFile' className='flex items-center flex-col '>
                        <IoCloudUpload fontSize={56} />
                        <h5 className='font-semibold'>Drop or select file</h5>
                      </label>
                      <input
                        type='file'
                        id='chooseFile'
                        multiple
                        onChange={handleFileChange}
                        onDrop={handleFileDrop}
                        className='hidden'
                      />
                    </>
                  )}
                </div>
                <div className='mt-4 flex justify-end gap-2'>
                  <button
                    className='px-4 py-2 rounded-sm font-semibold border'
                    onClick={() => setSelectedFile([])}
                  >
                    Clear
                  </button>
                  <button
                    className='px-4 py-2 rounded-sm font-semibold border bg-orange-400 hover:bg-orange-600'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </DialogChooseFile>,
            document.body
          )}
      </Flex>
      <Line />
    </>
  )
}

export default DocumentsHeader
