"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Edit, Trash2, ExternalLink } from "lucide-react"
import { LinkType } from "@/types/link"
import { getSocialMediaConfig } from "@/lib/socialMedia"

interface LinkData {
  id: string
  title: string
  url: string
  description?: string
  type: LinkType
  clickCount: number
  likeCount: number
  order: number
  isActive: boolean
}

interface SortableLinkItemProps {
  link: LinkData
  onEdit: (link: LinkData) => void
  onDelete: (linkId: string) => void
}

function SortableLinkItem({ link, onEdit, onDelete }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors ${
        isDragging ? 'shadow-2xl' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-700 rounded"
            title="Sürükleyerek sırala"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>

          {/* Link Icon */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${getSocialMediaConfig(link.type).color}20`,
              border: `2px solid ${getSocialMediaConfig(link.type).color}40`,
            }}
          >
            {(() => {
              const IconComponent = getSocialMediaConfig(link.type).icon
              return <IconComponent 
                className="w-6 h-6" 
                style={{ color: getSocialMediaConfig(link.type).color }} 
              />
            })()}
          </div>

          {/* Link Info */}
          <div>
            <h3 className="font-semibold">{link.title}</h3>
            <p className="text-sm text-gray-400">{link.url}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                {link.clickCount} tıklama
              </span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-500">
                {getSocialMediaConfig(link.type).name}
              </span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-500">
                Sıra: {link.order}
              </span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onEdit(link)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Linki Düzenle"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(link.id)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Linki Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <a
            href={link.url}
            target="_blank"
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            title="Linki Aç"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

interface SortableLinkListProps {
  links: LinkData[]
  onEdit: (link: LinkData) => void
  onDelete: (linkId: string) => void
  onReorder: (links: LinkData[]) => void
}

export default function SortableLinkList({ links, onEdit, onDelete, onReorder }: SortableLinkListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = links.findIndex(link => link.id === active.id)
      const newIndex = links.findIndex(link => link.id === over.id)
      
      const newLinks = arrayMove(links, oldIndex, newIndex)
      
      
      const updatedLinks = newLinks.map((link, index) => ({
        ...link,
        order: index
      }))
      
      onReorder(updatedLinks)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={links.map(link => link.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-4">
          {links
            .sort((a, b) => a.order - b.order)
            .map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

