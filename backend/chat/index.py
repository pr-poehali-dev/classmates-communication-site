import json
import os
from datetime import datetime
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Chat API for classmates - get messages and send new ones
    Args: event with httpMethod (GET/POST), body for POST requests
          context with request_id
    Returns: HTTP response with messages array or success status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        cursor.execute("SELECT id, author, text, avatar, created_at FROM t_p36723465_classmates_communica.chat_messages ORDER BY created_at ASC")
        messages = cursor.fetchall()
        
        formatted_messages = []
        for msg in messages:
            formatted_messages.append({
                'id': msg['id'],
                'author': msg['author'],
                'text': msg['text'],
                'avatar': msg['avatar'],
                'time': msg['created_at'].strftime('%H:%M') if msg['created_at'] else ''
            })
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'messages': formatted_messages})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        author = body_data.get('author', 'Аноним')
        text = body_data.get('text', '')
        avatar = body_data.get('avatar', 'АН')
        
        if not text:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Message text is required'})
            }
        
        cursor.execute(
            "INSERT INTO t_p36723465_classmates_communica.chat_messages (author, text, avatar) VALUES (%s, %s, %s) RETURNING id, created_at",
            (author, text, avatar)
        )
        result = cursor.fetchone()
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'id': result['id'],
                'time': result['created_at'].strftime('%H:%M')
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
