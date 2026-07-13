import "./HeaderEditor.css";

import type { HeaderInfo } from "../../types/HeaderInfo";

interface HeaderEditorProps {

    headerInfo: HeaderInfo;

    setHeaderInfo: React.Dispatch<
        React.SetStateAction<HeaderInfo>
    >;

    previewMode: boolean;

    setPreviewMode: React.Dispatch<
        React.SetStateAction<boolean>
    >;

    onSaveImage: () => void;

}

function HeaderEditor({

    headerInfo,

    setHeaderInfo,
    previewMode,
    setPreviewMode,
    onSaveImage

}: HeaderEditorProps) {

    
    return (

        <div className="header-editor">

            <input

                placeholder="제목"

                value={headerInfo.title}

                onChange={(e)=>

                    setHeaderInfo(prev=>({

                        ...prev,

                        title:e.target.value,

                    }))

                }

            />

            <input

                placeholder="부제목"

                value={headerInfo.subtitle}

                onChange={(e)=>

                    setHeaderInfo(prev=>({

                        ...prev,

                        subtitle:e.target.value,

                    }))

                }

            />

            <input

                placeholder="버전"

                value={headerInfo.version}

                onChange={(e)=>

                    setHeaderInfo(prev=>({

                        ...prev,

                        version:e.target.value,

                    }))

                }

            />

            <input

                placeholder="제작자"

                value={headerInfo.creator}

                onChange={(e)=>

                    setHeaderInfo(prev=>({

                        ...prev,

                        creator:e.target.value,

                    }))

                }

            />

            <div className="header-editor-buttons">


                <button

                    onClick={()=>

                        setPreviewMode(previewMode => !previewMode)

                    }

                >

                    미리보기

                </button>

            {

                previewMode && (

                    <button onClick={onSaveImage}>

                        이미지 저장

                    </button>

                )

            }

        </div>

        </div>

    );

}

export default HeaderEditor;